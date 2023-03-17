import {
  eventNames,
  useComponentRenderedTracking,
} from '@shopify/blockchain-components';
import {MotionConfig} from 'framer-motion';
import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';

import {Modal} from '../../components';
import {buildConnectors} from '../../connectors/buildConnectors';
import {I18nProvider} from '../I18nProvider';
import store from '../../store/configureStore';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';
import {ProviderProps} from './types';

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  connectors,
  children,
  enableDelegateCash = true,
  requireSignature = true,
  orderAttributionMode = 'required',
  statementGenerator,
}: PropsWithChildren<ProviderProps>) => {
  useComponentRenderedTracking(eventNames.CONNECT_WALLET_PROVIDER_RENDERED);

  const contextValue: ConnectWalletProviderValue = useMemo(() => {
    let contextualConnectors = connectors;

    if (!contextualConnectors.length) {
      const {connectors: defaultConnectors} = buildConnectors({
        chains,
      });
      contextualConnectors = defaultConnectors;
    }

    return {
      enableDelegateCash,
      chains,
      connectors: contextualConnectors,
      requireSignature,
      statementGenerator,
      orderAttributionMode,
    };
  }, [
    enableDelegateCash,
    chains,
    connectors,
    requireSignature,
    statementGenerator,
    orderAttributionMode,
  ]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          <Provider store={store}>
            {children}
            <Modal />
          </Provider>
        </MotionConfig>
      </I18nProvider>
    </ConnectWalletContext.Provider>
  );
};
