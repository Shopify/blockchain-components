import {publishEvent, eventNames} from '@shopify/blockchain-components';
import {useCallback, useContext} from 'react';
import {generateNonce, SiweMessage} from 'siwe';
import {useNetwork, useSignMessage as useWagmiSignMessage} from 'wagmi';

import {useAppDispatch, useAppSelector} from './useAppState';

import {ConnectWalletContext} from '~/providers/ConnectWalletProvider';
import {
  closeModal,
  navigate,
  openModal,
  setError,
  setSigning,
} from '~/slices/modalSlice';
import {
  setPendingConnector,
  setPendingWallet,
  validatePendingWallet,
} from '~/slices/walletSlice';
import {SignatureResponse, Wallet} from '~/types/wallet';
import {ConnectWalletError} from '~/utils/error';

export function useSignMessage() {
  const dispatch = useAppDispatch();
  const {open} = useAppSelector((state) => state.modal);
  const {chains, requireSignature, statementGenerator} =
    useContext(ConnectWalletContext);
  const {chain} = useNetwork();
  const {signMessageAsync} = useWagmiSignMessage();

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
    async (wallet: Wallet): Promise<SignatureResponse> => {
      if (!requireSignature) {
        throw new ConnectWalletError(
          'Signatures can only be requested on connect when requireSignature is true',
        );
      }

      dispatch(setSigning(true));

      // If the modal is not present, ensure that we open it.
      if (!open) {
        dispatch(openModal());
        dispatch(navigate('Signature'));
      }

      const {address, connectorId} = wallet;
      const nonce = generateNonce();

      const message = await generateMessage(address, nonce);

      try {
        // Wait for the signature
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });

        // Publish the signed message event
        publishEvent(eventNames.CONNECT_WALLET_ON_SIGN_MESSAGE_EVENT, {
          address,
          connector: connectorId,
        });

        /**
         * Note: We will only move past the `validatePendingWallet` action
         * when the signed message is decrypted to match the address
         * present in the `pendingWallet` object and when the nonces for the signature
         * and the message the store match.
         *
         * In the event that the following fails (throws an error due to
         * mismatched addresses) we will set the error state for the
         * signature modal and allow the user to try again.
         */
        await dispatch(
          validatePendingWallet({
            address,
            message: JSON.stringify(message),
            nonce,
            signature,
          }),
        );

        /**
         * Close the modal using `resetModal`.
         *
         * Signature cleanup should only be performed
         * when the user dismisses the modal while signing or
         * when pressing "Back" while signing, so we utilize
         * resetModal here to ensure the wallet
         * is not disconnected.
         */
        dispatch(setPendingConnector(undefined));
        dispatch(setPendingWallet(undefined));
        dispatch(closeModal());

        return {
          address,
          message: JSON.stringify(message),
          nonce,
          signature,
        };
      } catch (error: any) {
        /**
         * Set the error in state, resulting in an updated UI state for
         * the signature modal. The user can attempt to sign the message
         * with the correct wallet again.
         */
        dispatch(setError({message: error.message, name: error.name}));
        dispatch(setSigning(false));
        // If the error was returned by the use sign message hook then return that.
        throw error || new ConnectWalletError('Verification process failed.');
      }
    },
    [dispatch, generateMessage, open, requireSignature, signMessageAsync],
  );

  return {
    signMessage,
  };
}
