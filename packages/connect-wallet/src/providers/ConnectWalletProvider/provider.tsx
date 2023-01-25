import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {RootProvider} from 'shared';

import {I18nProvider} from '../I18nProvider';
import {ModalProvider} from '../ModalProvider';
import store from '../../store/configureStore';
import {ProviderProps} from '../../types/provider';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';

export {ConnectWalletContext};
export type {ConnectWalletProviderValue};

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
  theme,
  requireSignature = true,
}: PropsWithChildren<ProviderProps>) => {
  const contextValue = useMemo(() => {
    return {
      chains,
    };
  }, [chains]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <I18nProvider>
        <RootProvider theme={theme}>
          <Provider store={store}>
            <ModalProvider requireSignature={requireSignature}>
              {children}
            </ModalProvider>
          </Provider>
        </RootProvider>
      </I18nProvider>
    </ConnectWalletContext.Provider>
  );
};
