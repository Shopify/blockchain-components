import {useCallback, useContext} from 'react';

import {SignatureContext} from '../providers/SignatureProvider';
import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {UseWalletProps} from '../types/wallet';

import {useAppSelector} from './useAppState';
import {useWallet} from './useWallet';

type useConnectWalletProps = UseWalletProps;

export function useConnectWallet(props?: useConnectWalletProps) {
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const connectWalletContext = useContext(ConnectWalletContext);
  const signatureContext = useContext(SignatureContext);

  const {connecting, disconnect} = useWallet({
    onConnect: props?.onConnect,
    onDisconnect: props?.onDisconnect,
  });

  const {signMessage, signOnConnect, signing} = signatureContext;
  const {chains} = connectWalletContext;

  const signMessageCallback = useCallback(
    async (args?: {message?: string}) => {
      const response = await signMessage(args);

      props?.onMessageSigned?.(response);
    },
    [props, signMessage],
  );

  return {
    chains,
    connecting,
    disconnect,
    pendingConnector,
    signing,
    signMessage: signMessageCallback,
    signOnConnect,
    wallet: connectedWallets.length ? connectedWallets[0] : undefined,
  };
}
