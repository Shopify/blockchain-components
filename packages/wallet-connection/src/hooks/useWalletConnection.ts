import {useCallback, useContext} from 'react';

import {SignatureContext} from '../providers/SignatureProvider';
import {WalletConnectionContext} from '../providers/WalletConnectionProvider';
import {UseWalletProps} from '../types/wallet';

import {useAppSelector} from './useAppState';
import {useWallet} from './useWallet';

type UseWalletConnectionProps = UseWalletProps;

export function useWalletConnection(props?: UseWalletConnectionProps) {
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const walletConnectionContext = useContext(WalletConnectionContext);
  const signatureContext = useContext(SignatureContext);

  const {connecting} = useWallet({
    onConnect: props?.onConnect,
  });

  const {signMessage, signOnConnect, signing} = signatureContext;
  const {chains} = walletConnectionContext;

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
    pendingConnector,
    signing,
    signMessage: signMessageCallback,
    signOnConnect,
    wallet: connectedWallets.length ? connectedWallets[0] : undefined,
  };
}
