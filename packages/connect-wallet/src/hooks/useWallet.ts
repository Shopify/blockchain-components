import {useCallback} from 'react';
import {useAccount, useSignMessage} from 'wagmi';

import {addWallet, setPendingWallet} from '../slices/walletSlice';
import {
  SignMessageProps,
  SignatureResponse,
  UseWalletProps,
  UseWalletResponse,
  Wallet,
} from '../types/wallet';

import {useAppDispatch, useAppSelector} from './useAppState';

export function useWallet({
  onConnect,
  onMessageSigned,
  requireSignature,
}: UseWalletProps): UseWalletResponse {
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const handleConnect = useCallback(
    ({address, isReconnected}: {address?: string; isReconnected: boolean}) => {
      if (!address) {
        return;
      }

      /**
       * Wagmi makes use of isReconnected to rehydrate the client.
       * We need to make sure that we can re-dispatch the onConnect
       * callback for token validation.
       */
      if (isReconnected) {
        const reconnectedWallet = connectedWallets.find(
          (wallet) => wallet.address === address,
        );

        if (reconnectedWallet) {
          onConnect?.(reconnectedWallet);
          return;
        }
      }

      /**
       * Check to ensure we have a pending connector before proceeding.
       *
       * We require information from the pending connector to determine
       * where the connection originated (for UX purposes).
       */
      if (!pendingConnector) {
        return;
      }

      const wallet: Wallet = {
        address,
        connectorId: pendingConnector.id,
        connectorName: pendingConnector.name,
        // If signatures are required set signed to false
        signed: requireSignature ? false : undefined,
      };

      /**
       * Ensure that the wallet is added to the correct slice of our store
       * if we are utilizing requireSignature.
       *
       * Note: We do not consider a wallet connected until it has signed a
       * message to verify ownership when `requireSignature` is true.
       */
      if (requireSignature) {
        dispatch(setPendingWallet(wallet));
      } else {
        // Otherwise, add the wallet to connectedWallets.
        dispatch(addWallet(wallet));
      }

      // Call the onConnect callback provided via props
      onConnect?.(wallet);
    },
    [connectedWallets, dispatch, onConnect, pendingConnector, requireSignature],
  );

  const {isConnecting} = useAccount({
    onConnect: handleConnect,
  });
  const {error, isLoading, signMessageAsync} = useSignMessage();

  const signMessage = useCallback(
    async ({address, message}: SignMessageProps) => {
      try {
        const signature = await signMessageAsync({message});

        const response: SignatureResponse = {
          address,
          message,
          signature,
        };

        onMessageSigned?.(response);

        return response;
      } catch (caughtError) {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        const finalError =
          error || caughtError || new Error('Verification process failed.');
        throw finalError;
      }
    },
    [error, onMessageSigned, signMessageAsync],
  );

  return {
    connecting: isConnecting,
    signing: isLoading,
    signMessage,
  };
}
