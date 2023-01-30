import {useCallback, useContext} from 'react';
import {generateNonce, SiweMessage} from 'siwe';
import {useNetwork, useSignMessage} from 'wagmi';

import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {SignatureResponse, Wallet} from '../types/wallet';
import {ConnectWalletError} from '../utils/error';

export function useSyncSignMessage() {
  const {chains, statementGenerator} = useContext(ConnectWalletContext);
  const {chain} = useNetwork();
  const {isLoading, signMessageAsync} = useSignMessage();

  const generateMessage = useCallback(
    async (address: string, nonce: string) => {
      // Disabling for SSR frameworks.
      /* eslint-disable @typescript-eslint/no-unnecessary-condition */
      const domain = window?.location?.hostname || 'shopify.com';
      const uri = window?.location?.origin || 'unknown';
      /* eslint-enable @typescript-eslint/no-unnecessary-condition */

      /**
       * Initialize statement in the event that the developer passed in
       * a statementGenerator to the provider.
       */
      let statement;

      if (statementGenerator) {
        // We provide the messageGenerator with the address and domain.
        try {
          statement = await statementGenerator({address});
        } catch (error) {
          /**
           * If something goes wrong while attempting to utilize
           * the messageGenerator provided by the developer, we should
           * log the error without breaking the flow.
           */
          console.error(error);
        }
      }

      const message = new SiweMessage({
        address,
        // Prefer the active chain (it should be present) via chain.id
        // but defer to the chains provided to context.
        chainId: chain?.id || chains[0].id,
        domain,
        nonce,
        statement,
        uri,
        version: '1',
      });

      return message;
    },
    [chain?.id, chains, statementGenerator],
  );

  const signMessage = useCallback(
    async (wallet: Wallet) => {
      const {address} = wallet;
      const nonce = generateNonce();

      const message = await generateMessage(address, nonce);

      try {
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });

        const response: SignatureResponse = {
          address,
          message: JSON.stringify(message),
          nonce,
          signature,
        };

        return response;
      } catch (error) {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        throw error || new ConnectWalletError('Verification process failed.');
      }
    },
    [generateMessage, signMessageAsync],
  );

  return {
    signing: isLoading,
    signMessage,
  };
}
