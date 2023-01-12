import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {RootProvider} from 'shared';

import store from '../../store/configureStore';
import {ProviderProps} from '../../types/provider';
import {ModalProvider} from '../ModalProvider';
import {SignatureProvider} from '../SignatureProvider';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';

export {ConnectWalletContext};
export type {ConnectWalletProviderValue};

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
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
      <RootProvider theme={theme}>
        <Provider store={store}>
          <SignatureProvider signOnConnect={signOnConnect}>
            <ModalProvider>{children}</ModalProvider>
          </SignatureProvider>
        </Provider>
      </RootProvider>
    </ConnectWalletContext.Provider>
  );
};
