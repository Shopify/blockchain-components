import {LedgerLive as ledgerLiveIcon} from 'shared';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';

export const LedgerLive = ({
  chains,
  projectId,
}: ConnectorProps): ConnectorInstance => {
  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains, projectId});

      return connector;
    },
    desktopAppLink: 'ledgerlive://wc?uri=',
    marketingSite: 'https://www.ledger.com/ledger-live',
    mobileAppPrefixes: {
      Android: '',
      iOS: 'ledgerlive://wc?uri=',
    },
    icon: ledgerLiveIcon,
    id: 'ledger',
    name: 'Ledger Live',
    qrCodeSupported: true,
  };
};
