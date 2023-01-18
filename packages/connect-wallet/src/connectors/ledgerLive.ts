import {LedgerLive as ledgerLiveIcon} from 'shared';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

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
    name: 'Ledger',
    qrCodeSupported: true,
  };
};
