import {LedgerLive as ledgerLiveIcon} from 'shared';
import {LedgerConnector} from 'wagmi/connectors/ledger';

import {Browser} from '../types/browser';
import {ConnectorInstance, ConnectorProps} from '../types/connector';
import {getBrowserInfo} from '../utils/getBrowser';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const LedgerLive = ({chains}: ConnectorProps): ConnectorInstance => {
  /**
   * At the moment, Ledger Connect is only available in the Safari browser.
   * Because of this, we need to detect if the user is using Safari.
   * If they are on any other browser, we will default back to WalletConnect.
   *
   * https://developers.ledger.com/docs/connect/introduction/#platforms
   */

  const {browser, mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector =
        browser === Browser.Safari || mobilePlatform
          ? new LedgerConnector({chains})
          : buildWalletConnectConnector({chains});

      return connector;
    },
    desktopAppLink: 'ledgerlive://wc?uri=',
    marketingSite: 'https://www.ledger.com/ledger-live',
    mobileApps: {
      Android:
        'https://play.google.com/store/apps/details?id=com.ledger.live&hl=en_US&gl=US',
      iOS: 'https://apps.apple.com/app/id1361671700?mt=8',
    },
    icon: ledgerLiveIcon,
    id: 'ledgerLive',
    name: 'Ledger Live',
    qrCodeSupported: true,
  };
};
