import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {ThemeProvider} from 'styled-components';
import {Connector} from 'wagmi';

import {ModalProvider} from './ModalProvider';

import {GlobalStyle} from '../style/global';
import {Dawn} from '../themes/dawn';
import {ProviderProps} from '../types/provider';

export interface WalletConnectionProviderValue {
  pendingConnector?: Connector;
  setPendingConnector: Dispatch<SetStateAction<Connector | undefined>>;
}

const defaultContextValue: WalletConnectionProviderValue = {
  pendingConnector: undefined,
  setPendingConnector: () => {},
};

export const WalletConnectionContext =
  createContext<WalletConnectionProviderValue>(defaultContextValue);

export const WalletConnectionProvider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
}: PropsWithChildren<ProviderProps>) => {
  const [pendingConnector, setPendingConnector] = useState<
    Connector | undefined
  >();

  return (
    <WalletConnectionContext.Provider
      value={{pendingConnector, setPendingConnector}}
    >
      <ThemeProvider theme={Dawn}>
        <GlobalStyle />
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </WalletConnectionContext.Provider>
  );
};

export const useWalletConnection = () => {
  const context = useContext(WalletConnectionContext);
  if (!context) throw Error('WalletConnection context not present.');
  return context;
};
