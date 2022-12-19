import {useCallback} from 'react';
import {useAccount, useDisconnect, useSignMessage} from 'wagmi';

import {
  addWallet,
  removeWallet,
  setAddressToVerify,
} from '../slices/walletSlice';
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
  onDisconnect,
  onMessageSigned,
  signOnConnect,
}: UseWalletProps): UseWalletResponse {
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const handleConnect = useCallback(
    ({address}: {address?: string}) => {
      if (!address) {
        return;
      }

      // See if the wallet is already connected and exists in our store.
      const wallet = connectedWallets.find((item) => item.address === address);

      if (wallet) {
        /**
         * Check if the wallet has already signed the signature request.
         * If not, then we can check against the params for signOnConnect and
         * dispatch the address to verify if needed.
         */
        if (!wallet.signed && signOnConnect) {
          dispatch(setAddressToVerify(address));
        }

        // Call the onConnect callback.
        onConnect?.(wallet);

        return;
      }

      /**
       * Check to ensure we have a pending connector before proceeding.
       *
       * We require information from the pending connector to determine
       * where the connection originated (for UX purposes).
       */
      if (pendingConnector) {
        const wallet: Wallet = {
          address,
          connectorId: pendingConnector.id,
          connectorName: pendingConnector.name,
          // If signatures are requested on connection, set signed to false
          signed: signOnConnect ? false : undefined,
        };

        // Add the wallet to our store
        dispatch(addWallet(wallet));

        // If we're signing on connect, then dispatch the adress to verify to the store
        if (signOnConnect) {
          dispatch(setAddressToVerify(address));
        }

        // Call the onConnect callback.
        onConnect?.(wallet);
      }
    },
    [connectedWallets, dispatch, onConnect, pendingConnector, signOnConnect],
  );

  const {address, isConnecting} = useAccount({
    onConnect: handleConnect,
  });
  const {disconnect} = useDisconnect();
  const {error, isLoading, signMessageAsync} = useSignMessage();

  const handleDisconnect = useCallback(() => {
    if (!address) {
      throw new Error('No wallet connected');
    }

    /**
     * Find the wallet in our store and remove it.
     *
     * If we don't find the wallet for some reason we can
     * assume there is stale state and still perform the disconnect.
     *
     * Another assumption being made here is that we don't have
     * multiple of the same address in our store. Since we prevent
     * the addition of any wallets that have a matching address, this
     * is a relatively safe assumption.
     */
    const walletToDisconnect = connectedWallets.find(
      (wallet) => wallet.address === address,
    );

    if (walletToDisconnect) {
      dispatch(removeWallet(walletToDisconnect));

      onDisconnect?.(walletToDisconnect);
    }

    disconnect();
  }, [address, connectedWallets, disconnect, dispatch, onDisconnect]);

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
      } catch {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        throw error || new Error('Verification process failed.');
      }
    },
    [error, onMessageSigned, signMessageAsync],
  );

  return {
    connecting: isConnecting,
    disconnect: handleDisconnect,
    signing: isLoading,
    signMessage,
  };
}
