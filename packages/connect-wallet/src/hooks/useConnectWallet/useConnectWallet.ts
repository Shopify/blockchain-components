import {useContext} from 'react';
import {useAccount} from 'wagmi';

import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {useAppSelector} from '../useAppState';
import {useDisconnect} from '../useDisconnect';

import {useConnectWalletProps} from './types';
import {useConnectWalletCallbacks} from './useConnectWalletCallbacks';

export function useConnectWallet(props?: useConnectWalletProps) {
  const {signing} = useAppSelector((state) => state.modal);
  const {
    activeWallet,
    connectedWallets,
    fetchingDelegates,
    fetchingEns,
    pendingConnector,
  } = useAppSelector((state) => state.wallet);

  const connectWalletContext = useContext(ConnectWalletContext);

  const {chains} = connectWalletContext;

  useConnectWalletCallbacks({
    ...props,
  });

  const {isConnecting} = useAccount();

  const {disconnect} = useDisconnect();

  return {
    chains,
    connecting: isConnecting,
    connectedWallets,
    disconnect,
    fetchingDelegates,
    fetchingEns,
    pendingConnector,
    signing,
    wallet: activeWallet,
  };
}
