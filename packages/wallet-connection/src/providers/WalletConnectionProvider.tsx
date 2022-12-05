import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {ThemeProvider} from 'shared';
import {Chain} from 'wagmi';

import {ModalProvider} from './ModalProvider';

import {SignatureModal} from '../components/Modal';
import {useWallet} from '../hooks/useWallet';
import {useWalletConnectDeeplink} from '../hooks/useWalletConnectDeeplink';
import {GlobalStyle} from '../style/global';
import {Connector} from '../types/connector';
import {ProviderProps} from '../types/provider';
import {SignatureResponse, UseWalletProps, Wallet} from '../types/wallet';

export interface WalletConnectionProviderValue {
  chains: Chain[];
  clearWalletConnection: () => void;
  pendingConnector?: Connector;
  setPendingConnector: Dispatch<SetStateAction<Connector | undefined>>;
  signing?: boolean;
  signMessage: (props?: {message?: string}) => Promise<SignatureResponse>;
  wallet?: Wallet;
}

const defaultContextValue: WalletConnectionProviderValue = {
  chains: [],
  clearWalletConnection: () => {},
  pendingConnector: undefined,
  setPendingConnector: () => {},
  signing: false,
  signMessage: async () => undefined,
};

export const WalletConnectionContext =
  createContext<WalletConnectionProviderValue>(defaultContextValue);

export const WalletConnectionProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
  customTheme,
  theme,
  wallet: providedWallet,
}: PropsWithChildren<ProviderProps>) => {
  const [wallet, setWallet] = useState<Wallet | undefined>(providedWallet);
  const [pendingConnector, setPendingConnector] = useState<
    Connector | undefined
  >();
  const [message, setMessage] = useState<string | undefined>();

  const {deleteKey} = useWalletConnectDeeplink();
  const {disconnect, signing, signMessage} = useWallet({
    onConnect: (response) => {
      if (response) {
        let {connectorId, connectorName} = response;

        /**
         * Temporary --
         *
         * Override the connectorId and connectorName.
         * This will only work on the first request since we do
         * not have persisted data for the user's chosen wallet.
         */
        if (pendingConnector) {
          const {id, name} = pendingConnector;
          connectorId = id;
          connectorName = name;
        }

        setWallet({...response, connectorId, connectorName, signed: false});
        return;
      }

      setWallet(undefined);
    },
  });

  const clearWalletConnection = useCallback(() => {
    /**
     * If the pending connector's wagmiConnector is walletConnect
     * and the user is on a mobile device we need to remove the
     * walletConnect storage key.
     */
    deleteKey();
    setMessage(undefined);
    disconnect();
  }, [disconnect]);

  /**
   * ## requestSignature
   *
   * This function is different from `signMessage` in that it takes an optional message
   * parameter. The reason for this is that the message is set in state, so if a message
   * param is not passed, we use the message from state for the signature request.
   *
   * The idea behind this is that the signature request modal can have a `Try again` button
   * in the future.
   */
  const requestSignature = useCallback(
    async (props?: {message?: string}) => {
      if (!wallet) {
        throw new Error('There are no connected wallets.');
      }

      let messageToSign = message;

      if (props?.message) {
        setMessage(props.message);
        messageToSign = props.message;
      }

      if (!messageToSign) {
        throw new Error('A message has not yet been provided.');
      }

      try {
        const verificationResponse = await signMessage({
          address: wallet.address,
          message: messageToSign,
        });

        if (verificationResponse?.signature) {
          setWallet({
            ...wallet,
            signed: true,
            signedOn: new Date().toISOString(),
          });

          setMessage(undefined);
        }

        /**
         * In the future we can store the verification we received at this point
         * so that we don't request the signature more than once.
         * Perhaps via something like usePersistedState.
         */
        return verificationResponse;
      } catch (error) {
        /**
         * Cancel the verification process and disconnect the wallet.
         * In the future we can consider adding a `try again` button instead
         * which then allows the user to request another signature.
         */
        clearWalletConnection();
        console.error('ERROR', error);
      }
    },
    [clearWalletConnection, signMessage, message, wallet],
  );

  return (
    <WalletConnectionContext.Provider
      value={{
        chains,
        clearWalletConnection,
        pendingConnector,
        setPendingConnector,
        signing,
        signMessage: requestSignature,
        wallet,
      }}
    >
      <ThemeProvider theme={theme} customTheme={customTheme}>
        <GlobalStyle />
        <ModalProvider>{children}</ModalProvider>
        {message ? <SignatureModal /> : null}
      </ThemeProvider>
    </WalletConnectionContext.Provider>
  );
};

export const useWalletConnection = () => {
  const context = useContext(WalletConnectionContext);
  if (!context) throw Error('WalletConnection context not present.');
  return context;
};

/**
 * This is separate from useWalletConnection because we do not want to expose
 * clearWalletConnection or setPendingConnector. As our context value grows,
 * the list of values we don't want to expose might grow with it, which is why
 * this separate hook was created.
 */
export const useExternalWalletConnection = ({
  onConnect: onConnectCallback,
  onMessageSigned: onMessageSignedCallback,
}: UseWalletProps) => {
  const context = useContext(WalletConnectionContext);
  if (!context) throw Error('WalletConnection context not present.');
  const {pendingConnector, signing, signMessage, wallet} = context;

  const {connecting, disconnect} = useWallet({
    onConnect: (response) => onConnectCallback?.(response),
  });

  const signMessageCallback = useCallback(
    async ({message}: {message?: string}) => {
      const response = await signMessage({message});

      onMessageSignedCallback?.(response);
    },
    [onMessageSignedCallback, signMessage],
  );

  return {
    connecting,
    disconnect,
    pendingConnector,
    signing,
    signMessage: signMessageCallback,
    wallet,
  };
};
