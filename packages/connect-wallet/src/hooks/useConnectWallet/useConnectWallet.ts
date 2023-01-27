import {useContext} from 'react';
import {useAccount} from 'wagmi';

import {ModalContext} from '../../providers/ModalProvider';
import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {useAppSelector} from '../useAppState';
import {useDisconnect} from '../useDisconnect';

import {useConnectWalletProps} from './types';
import {useConnectWalletCallbacks} from './useConnectWalletCallbacks';

export function useConnectWallet(props?: useConnectWalletProps) {
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const connectWalletContext = useContext(ConnectWalletContext);
  const modalContext = useContext(ModalContext);

  const {chains} = connectWalletContext;
  const {signMessage, signing} = modalContext;

  const {isDisconnected, isConnected} = useConnectWalletCallbacks({
    ...props,
  });

  const {isConnecting} = useAccount();

  const {disconnect} = useDisconnect();

  return {
    chains,
    connecting: isConnecting,
    isConnected,
    isDisconnected,
    disconnect,
    pendingConnector,
    signing,
    signMessage,
    wallet: connectedWallets.length ? connectedWallets[0] : undefined,
  };
}
