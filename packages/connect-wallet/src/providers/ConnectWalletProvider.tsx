import {Chain} from '@wagmi/core';
import {createContext, FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {RootProvider} from 'shared';

import store from '../store/configureStore';
import {GlobalStyle} from '../style/global';
import {ProviderProps} from '../types/provider';

import {ModalProvider} from './ModalProvider';
import {SignatureProvider} from './SignatureProvider';

export interface ConnectWalletProviderValue {
  chains: Chain[];
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
  customTheme,
  theme,
  signOnConnect = true,
}: PropsWithChildren<ProviderProps>) => {
  const contextValue = useMemo(() => {
    return {
      chains,
    };
  }, [chains]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <RootProvider theme={theme} customTheme={customTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <SignatureProvider signOnConnect={signOnConnect}>
            <ModalProvider>{children}</ModalProvider>
          </SignatureProvider>
        </Provider>
      </RootProvider>
    </ConnectWalletContext.Provider>
  );
};
