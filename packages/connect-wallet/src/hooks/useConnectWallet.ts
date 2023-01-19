import {useCallback, useContext} from 'react';

import {SignatureContext} from '../providers/SignatureProvider';
import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {SignatureResponse, UseWalletProps} from '../types/wallet';

import {useAppSelector} from './useAppState';
import {useWallet} from './useWallet';
import {useOrderAttribution} from './useOrderAttribution';
import {useDisconnect} from './useDisconnect';

/**
 * Dictates how we will handle automatic order attribution. If
 * set to `required`, any error that occurs with the attribution
 * will be thrown.
 *
 * If set to `ignoreErrors`, any error that occurs with the attribution
 * will be logged to the console and otherwise ignored.
 *
 * If set to `disabled`, no order attribution will be attempted.
 */
type MessageSignedOrderAttributionMode =
  | 'required'
  | 'ignoreErrors'
  | 'disabled';

interface useConnectWalletProps
  extends Omit<UseWalletProps, 'requireSignature'> {
  /**
   * Defaults to 'required'.
   */
  messageSignedOrderAttributionMode?: MessageSignedOrderAttributionMode;
}

export function useConnectWallet(props?: useConnectWalletProps) {
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const connectWalletContext = useContext(ConnectWalletContext);
  const signatureContext = useContext(SignatureContext);

  const {chains} = connectWalletContext;
  const {signMessage, requireSignature, signing} = signatureContext;

  const {connecting} = useWallet({
    onConnect: props?.onConnect,
    onDisconnect: props?.onDisconnect,
    requireSignature,
  });
  const {disconnect} = useDisconnect();

  const {messageSignedOrderAttributionMode, onMessageSigned} = props || {};
  const handleMessageSigned = useMessageSignedCallback({
    messageSignedOrderAttributionMode,
    onMessageSigned,
  });

  const signMessageCallback = useCallback(
    async (args?: {message?: string}) => {
      const response = await signMessage(args);

      return handleMessageSigned(response);
    },
    [signMessage, handleMessageSigned],
  );

  return {
    chains,
    connecting,
    disconnect,
    pendingConnector,
    signing,
    signMessage: signMessageCallback,
    wallet: connectedWallets.length ? connectedWallets[0] : undefined,
  };
}

/**
 * Combines the callback passed by the caller of `useConnectWallet` and invokes the
 * order attribution hook if necessary.
 */
const useMessageSignedCallback = ({
  messageSignedOrderAttributionMode,
  onMessageSigned,
}: {
  messageSignedOrderAttributionMode?: MessageSignedOrderAttributionMode;
  onMessageSigned?: useConnectWalletProps['onMessageSigned'];
}) => {
  const attributeOrder = useOrderAttribution();

  const handleAttribution = useCallback(
    async (response: SignatureResponse) => {
      if (messageSignedOrderAttributionMode === 'disabled') return;

      if (messageSignedOrderAttributionMode === 'ignoreErrors') {
        if (!response?.address) return;

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

      // by default we require attribution
      if (!response?.address) {
        throw new ConnectWalletError('No address found in signature response');
      }

      // since the attribution mode is `required`, we want to propagate any errors that occur here.
      await attributeOrder({address: response.address});
    },
    [messageSignedOrderAttributionMode, attributeOrder],
  );

  return useCallback(
    async (response: SignatureResponse) => {
      await handleAttribution(response);
      onMessageSigned?.(response);
    },
    [handleAttribution, onMessageSigned],
  );
};

class ConnectWalletError extends Error {
  constructor(message: string) {
    super(message);
    this.message = `@shopify/connect-wallet -- ${message}.`;
  }
}
