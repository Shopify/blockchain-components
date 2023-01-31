import {isAnyOf} from '@reduxjs/toolkit';
import {useCallback, useContext, useEffect} from 'react';

import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {
  addWallet,
  removeWallet,
  setActiveWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {SignatureResponse, Wallet} from '../../types/wallet';
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
    const unsubscribeToOnConnectListener = dispatch(
      addListener({
        matcher: isAnyOf(
          addWallet,
          validatePendingWallet.fulfilled,
          setActiveWallet,
        ),
        effect: (action, state) => {
          let walletToDispatch: Wallet | undefined;

          if (action.type === 'wallet/validatePendingWallet/fulfilled') {
            const signatureResponse = action.meta.arg;
            const {address, signature} = signatureResponse;

            const {connectedWallets} = state.getState().wallet;
            walletToDispatch = connectedWallets.find(
              (wallet) =>
                wallet.address === address && wallet.signature === signature,
            );
          } else {
            walletToDispatch = action.payload;
          }

          if (walletToDispatch) {
            onConnect?.(walletToDispatch);
          }
        },
      }),
    );

    return unsubscribeToOnConnectListener;
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
};
