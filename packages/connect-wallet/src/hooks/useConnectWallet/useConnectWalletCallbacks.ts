import {useCallback, useContext} from 'react';
import {useAccount} from 'wagmi';

import {SignatureContext} from '../../providers/SignatureProvider';
import {addWallet, setPendingWallet} from '../../slices/walletSlice';
import {Wallet} from '../../types/wallet';
import {useAppDispatch, useAppSelector} from '../useAppState';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {onConnect, onDisconnect} = props || {};
  const signatureContext = useContext(SignatureContext);
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );
  const {requireSignature} = signatureContext;

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

  const {isDisconnected, isConnected} = useAccount({
    onDisconnect,
    onConnect: handleConnect,
  });

  return {
    isConnected,
    isDisconnected,
  };
};
