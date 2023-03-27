import {eventNames, publishEvent} from '@shopify/blockchain-components';
import {useEffect} from 'react';

import {removeWallet, attributeOrder} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {useAppDispatch} from '../useAppState';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {onConnect, onDisconnect} = props || {};
  const dispatch = useAppDispatch();

  /**
   * Add the onConnect callback listeners.
   *
   * This listener will run after the order is attributed,
   * which is the last step of the connect wallet flow.
   * Complete flow diagram of connecting a wallet: https://tinyurl.com/4dbfcm5w
   */
  useEffect(() => {
    const listener = addListener({
      actionCreator: attributeOrder.fulfilled,
      effect: (_action, state) => {
        const {activeWallet} = state.getState().wallet;
        if (!activeWallet) return;

        publishEvent(eventNames.CONNECT_WALLET_ON_CONNECT_EVENT, {
          address: activeWallet.address,
          vaults: activeWallet.vaults,
          connector: activeWallet.connectorId,
        });
        onConnect?.(activeWallet);
      },
    });

    return dispatch(listener);
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
};
