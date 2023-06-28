import {useContext} from 'react';
import {useAccount} from 'wagmi';

import {useDisconnect} from '../useDisconnect';

import {useConnectWalletProps} from './types';
import {useConnectWalletCallbacks} from './useConnectWalletCallbacks';

import {ConnectWalletContext} from '~/providers/ConnectWalletProvider';
import {useStore} from '~/state';

export function useConnectWallet(props?: useConnectWalletProps) {
  // Make sure that our provided callbacks are run.
  useConnectWalletCallbacks(props);

  const [{signing}, {activeWallet, connectedWallets, pendingConnector}] =
    useStore((state) => [state.modal, state.wallet]);

  const connectWalletContext = useContext(ConnectWalletContext);

  const {chains} = connectWalletContext;

  const {isConnecting} = useAccount();
  const {disconnect} = useDisconnect();

  return {
    chains,
    connecting: isConnecting,
    connectedWallets,
    disconnect,
    pendingConnector,
    signing,
    wallet: activeWallet,
  };
}
