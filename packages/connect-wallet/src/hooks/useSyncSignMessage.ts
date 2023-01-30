import {useCallback, useContext} from 'react';
import {generateNonce, SiweMessage} from 'siwe';
import {useNetwork, useSignMessage} from 'wagmi';

import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {SignatureResponse, Wallet} from '../types/wallet';
import {ConnectWalletError} from '../utils/error';

export function useSyncSignMessage() {
  const {chains} = useContext(ConnectWalletContext);
  const {chain} = useNetwork();
  const {isLoading, signMessageAsync} = useSignMessage();

  const generateMessage = useCallback(
    (address: string, nonce: string) => {
      /**
       * Note: Disabling the eslint for unnecessary condition
       * because of SSG/SSR frameworks.
       */
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const domain = window?.location?.hostname || 'shopify.com';

      const message = new SiweMessage({
        address,
        // Prefer the active chain (it should be present) via chain.id
        // but defer to the chains provided to context.
        chainId: chain?.id || chains[0].id,
        domain,
        nonce,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        uri: window?.location?.origin || 'unknown',
        version: '1',
      });

      return message;
    },
    [chain?.id, chains],
  );

  const signMessage = useCallback(
    async (wallet: Wallet) => {
      const {address} = wallet;
      const nonce = generateNonce();

      const message = generateMessage(address, nonce);

      try {
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });

        const response: SignatureResponse = {
          address,
          message: JSON.stringify(message),
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
