import {eventNames, publishEvent} from '@shopify/blockchain-components';
import {useContext, useEffect} from 'react';

import {buildOnConnectMiddleware} from '../../middleware/onConnectMiddleware';
import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {removeWallet} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {useAppDispatch} from '../useAppState';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {enableDelegateCash} = useContext(ConnectWalletContext);
  const {onConnect, onDisconnect} = props || {};
  const dispatch = useAppDispatch();

  // Add the onConnect callback listeners.
  useEffect(() => {
    const listener = buildOnConnectMiddleware(({wallet}) => {
      publishEvent(eventNames.CONNECT_WALLET_ON_CONNECT_EVENT, {
        address: wallet.address,
        vaults: wallet.vaults,
        connector: wallet.connectorId,
      });
      onConnect?.(wallet);
    }, enableDelegateCash);

    return dispatch(listener);
  }, [dispatch, enableDelegateCash, onConnect]);

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
