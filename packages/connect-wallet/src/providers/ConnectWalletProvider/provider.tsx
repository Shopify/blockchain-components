import {
  eventNames,
  useComponentRenderedTracking,
} from '@shopify/blockchain-components';
import {MotionConfig} from 'framer-motion';
import {FC, PropsWithChildren, useMemo} from 'react';

import {I18nProvider} from '../I18nProvider';

import {ConnectWalletContext, ConnectWalletProviderValue} from './context';
import {ProviderProps} from './types';

import {Modal} from '~/components';

export const ConnectWalletProvider: FC<PropsWithChildren<ProviderProps>> = ({
  chains,
  connectors,
  children,
  customTitles,
  enableDelegateCash = true,
  orderAttributionMode = 'required',
  requireSignature = true,
  statementGenerator,
}: PropsWithChildren<ProviderProps>) => {
  useComponentRenderedTracking(eventNames.CONNECT_WALLET_PROVIDER_RENDERED);

  const contextValue: ConnectWalletProviderValue = useMemo(() => {
    return {
      enableDelegateCash,
      chains,
      connectors,
      customTitles,
      requireSignature,
      statementGenerator,
      orderAttributionMode,
    };
  }, [
    enableDelegateCash,
    chains,
    connectors,
    customTitles,
    requireSignature,
    statementGenerator,
    orderAttributionMode,
  ]);

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          {children}
          <Modal />
        </MotionConfig>
      </I18nProvider>
    </ConnectWalletContext.Provider>
  );
};
