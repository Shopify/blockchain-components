import {useCallback, useContext, useEffect} from 'react';
import {useAccount} from 'wagmi';

import {ModalContext} from '../../providers/ModalProvider';
import {
  addWallet,
  removeWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {SignatureResponse} from '../../types/wallet';
import {ConnectWalletError} from '../../utils/error';
import {useAppDispatch} from '../useAppState';
import {useOrderAttribution} from '../useOrderAttribution';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {
    messageSignedOrderAttributionMode,
    onConnect,
    onDisconnect,
    onMessageSigned,
  } = props || {};
  const {requireSignature} = useContext(ModalContext);
  const dispatch = useAppDispatch();
  const attributeOrder = useOrderAttribution();

  const handleAttribution = useCallback(
    async (response: SignatureResponse) => {
      if (messageSignedOrderAttributionMode === 'disabled') return;

      if (messageSignedOrderAttributionMode === 'ignoreErrors') {
        if (!response?.address) return;

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

      // by default we require attribution
      if (!response?.address) {
        throw new ConnectWalletError('No address found in signature response');
      }

      // since the attribution mode is `required`, we want to propagate any errors that occur here.
      await attributeOrder({address: response.address});
    },
    [messageSignedOrderAttributionMode, attributeOrder],
  );

  // Add the onConnect callback listeners.
  useEffect(() => {
    const unsubscribeToAddWalletListener = dispatch(
      addListener({
        actionCreator: addWallet,
        effect: (action) => {
          onConnect?.(action.payload);
        },
      }),
    );

    return unsubscribeToAddWalletListener;
  }, [dispatch, onConnect]);

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

  // Add the onMessageSigned callback listeners.
  useEffect(() => {
    if (requireSignature) {
      const unsubscribeToMessageSigned = dispatch(
        addListener({
          actionCreator: validatePendingWallet,
          effect: (action, state) => {
            if (!action.payload) {
              return;
            }

            const {address, message, signature} = action.payload;
            const {connectedWallets} = state.getState().wallet;

            const response: SignatureResponse = {
              address,
              message,
              signature,
            };

            // Run the onConnect callback
            const walletConnected = connectedWallets.find(
              (wallet) => wallet.address === address,
            );

            if (walletConnected) {
              onConnect?.(walletConnected);
            }

            // Run the onMessageSigned callback
            onMessageSigned?.(response);

            // Perform attribution handling
            handleAttribution(response);
          },
        }),
      );

      return unsubscribeToMessageSigned;
    }
  }, [
    dispatch,
    handleAttribution,
    onConnect,
    onMessageSigned,
    requireSignature,
  ]);

  const {isConnected, isDisconnected} = useAccount();

  return {
    isConnected,
    isDisconnected,
  };
};
