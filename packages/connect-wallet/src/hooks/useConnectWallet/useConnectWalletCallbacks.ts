import {eventNames, publishEvent} from '@shopify/blockchain-components';
import {useEffect} from 'react';

import {buildOnConnectMiddleware} from '../../middleware/onConnectMiddleware';
import {removeWallet} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {useAppDispatch} from '../useAppState';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {onConnect, onDisconnect} = props || {};
  const dispatch = useAppDispatch();

  // Add the onConnect callback listeners.
  useEffect(() => {
    const listener = buildOnConnectMiddleware(({wallet}) => {
      publishEvent(eventNames.CONNECT_WALLET_ON_CONNECT_EVENT, {
        address: wallet.address,
        connector: wallet.connectorId,
      });
      onConnect?.(wallet);
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
