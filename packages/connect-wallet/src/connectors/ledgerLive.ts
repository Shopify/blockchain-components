import {LedgerLive as ledgerLiveIcon} from 'shared';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';

export const LedgerLive = ({chains}: ConnectorProps): ConnectorInstance => {
  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains});

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
