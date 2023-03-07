import {MotionConfig} from 'framer-motion';
import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {RootProvider} from 'shared';

import {buildConnectors} from '../../connectors/buildConnectors';
import {I18nProvider} from '../I18nProvider';
import {ModalProvider} from '../ModalProvider';
import store from '../../store/configureStore';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';
import {ProviderProps} from './types';

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  connectors,
  children,
  requireSignature = true,
  orderAttributionMode = 'required',
  statementGenerator,
  theme,
}: PropsWithChildren<ProviderProps>) => {
  const contextValue: ConnectWalletProviderValue = useMemo(() => {
    let contextualConnectors = connectors;

    if (!contextualConnectors.length) {
      const {connectors: defaultConnectors} = buildConnectors({
        chains,
      });
      contextualConnectors = defaultConnectors;
    }

    return {
      chains,
      connectors: contextualConnectors,
      requireSignature,
      statementGenerator,
      orderAttributionMode,
    };
  }, [
    chains,
    connectors,
    requireSignature,
    statementGenerator,
    orderAttributionMode,
  ]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <I18nProvider>
        <RootProvider theme={theme}>
          <MotionConfig reducedMotion="user">
            <Provider store={store}>
              <ModalProvider>{children}</ModalProvider>
            </Provider>
          </MotionConfig>
        </RootProvider>
      </I18nProvider>
    </ConnectWalletContext.Provider>
  );
};
