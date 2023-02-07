import {isAnyOf} from '@reduxjs/toolkit';
import {useContext, useEffect} from 'react';

import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {
  addWallet,
  removeWallet,
  setActiveWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {Wallet} from '../../types/wallet';
import {useAppDispatch} from '../useAppState';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {onConnect, onDisconnect} = props || {};
  const {requireSignature} = useContext(ConnectWalletContext);
  const dispatch = useAppDispatch();

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
  }, [dispatch, onConnect, requireSignature]);

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
