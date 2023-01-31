import {useCallback, useContext, useEffect} from 'react';
import {useAccount} from 'wagmi';

import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {
  addWallet,
  removeWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {SignatureResponse} from '../../types/wallet';
import {useAppDispatch} from '../useAppState';
import {useOrderAttribution} from '../useOrderAttribution';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {messageSignedOrderAttributionMode, onConnect, onDisconnect} =
    props || {};
  const {requireSignature} = useContext(ConnectWalletContext);
  const dispatch = useAppDispatch();
  const attributeOrder = useOrderAttribution();

  const handleAttribution = useCallback(
    async (response: SignatureResponse) => {
      if (messageSignedOrderAttributionMode === 'disabled') return;

      if (messageSignedOrderAttributionMode === 'ignoreErrors') {
        // when `messageSignedOrderAttributionMode` is set to `ignoreErrors`,
        // we don't want to block the caller from continuing, so we
        // just console log the error to fail silently. Note this is a non-awaited
        // promise.
        attributeOrder({address: response.address}).catch((error) => {
          console.error(
            'Error attributing order--ignoring due to orderAttributionMode=ignoreErrors',
            error,
          );
        });
        return;
      }

      // since the attribution mode is `required`, we want to propagate any errors that occur here.
      await attributeOrder({address: response.address});
    },
    [messageSignedOrderAttributionMode, attributeOrder],
  );

  // Add the onConnect callback listeners.
  useEffect(() => {
    if (requireSignature) {
      const unsubscribeToConnectedWalletListener = dispatch(
        addListener({
          actionCreator: validatePendingWallet.fulfilled,
          effect: (action, state) => {
            const signatureResponse = action.meta.arg;
            const {address, message, signature} = signatureResponse;
            const {connectedWallets} = state.getState().wallet;

            // Run the onConnect callback
            const walletConnected = connectedWallets.find(
              (wallet) =>
                wallet.address === address &&
                wallet.message === message &&
                wallet.signature === signature,
            );

            if (walletConnected) {
              onConnect?.(walletConnected);
            }

            // Perform attribution handling
            handleAttribution(signatureResponse);
          },
        }),
      );

      return unsubscribeToConnectedWalletListener;
    }

    const unsubscribeToAddWalletListener = dispatch(
      addListener({
        actionCreator: addWallet,
        effect: (action) => {
          onConnect?.(action.payload);
        },
      }),
    );

    return unsubscribeToAddWalletListener;
  }, [dispatch, handleAttribution, onConnect, requireSignature]);

  // Add the onDisconnect callback listeners.
  useEffect(() => {
    const unsubscribeToRemoveWalletListener = dispatch(
      addListener({
        actionCreator: removeWallet,
        effect: (action) => {
          onDisconnect?.(action.payload);
        },
      }),
    );

    return unsubscribeToRemoveWalletListener;
  }, [dispatch, onDisconnect]);

  const {isConnected, isDisconnected} = useAccount();

  return {
    isConnected,
    isDisconnected,
  };
};
