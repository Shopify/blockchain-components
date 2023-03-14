import {MotionConfig} from 'framer-motion';
import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';

import {I18nProvider} from '../I18nProvider';
import {ModalProvider} from '../ModalProvider';
import store from '../../store/configureStore';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';
import {ProviderProps} from './types';

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  children,
  requireSignature = true,
  orderAttributionMode = 'required',
  statementGenerator,
}: PropsWithChildren<ProviderProps>) => {
  const contextValue: ConnectWalletProviderValue = useMemo(() => {
    return {
      chains,
      requireSignature,
      statementGenerator,
      orderAttributionMode,
    };
  }, [chains, requireSignature, statementGenerator, orderAttributionMode]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          <Provider store={store}>
            <ModalProvider>{children}</ModalProvider>
          </Provider>
        </MotionConfig>
      </I18nProvider>
    </ConnectWalletContext.Provider>
  );
};
