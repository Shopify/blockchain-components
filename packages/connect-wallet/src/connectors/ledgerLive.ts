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
    mobileApps: {
      Android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
      iOS: 'https://apps.apple.com/app/id1361671700?mt=8',
    },
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
