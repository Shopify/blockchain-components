import {createContext, FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {RootProvider} from 'shared';
import {Chain} from 'wagmi';

import store from '../store/configureStore';
import {GlobalStyle} from '../style/global';
import {ProviderProps} from '../types/provider';

import {ModalProvider} from './ModalProvider';
import {SignatureProvider} from './SignatureProvider';

export interface WalletConnectionProviderValue {
  chains: Chain[];
}

const defaultContextValue: WalletConnectionProviderValue = {
  chains: [],
};

export const WalletConnectionContext =
  createContext<WalletConnectionProviderValue>(defaultContextValue);

export const WalletConnectionProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
  customTheme,
  theme,
  signOnConnect,
}: PropsWithChildren<ProviderProps>) => {
  const contextValue = useMemo(() => {
    return {
      chains,
    };
  }, [chains]);

  return (
    <WalletConnectionContext.Provider value={contextValue}>
      <RootProvider theme={theme} customTheme={customTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <SignatureProvider signOnConnect={signOnConnect}>
            <ModalProvider>{children}</ModalProvider>
          </SignatureProvider>
        </Provider>
      </RootProvider>
    </WalletConnectionContext.Provider>
  );
};
