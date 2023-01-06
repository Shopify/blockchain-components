import {CoinbaseWallet} from 'shared';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

export const Coinbase = ({
  appName,
  chains,
}: ConnectorProps): ConnectorInstance => {
  return {
    createConnector: () => {
      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName: appName || '',
          headlessMode: true,
        },
      });

      return connector;
    },
    browserExtensions: {
      Brave:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      Chrome:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
    },
    marketingSite: 'https://www.coinbase.com/wallet',
    mobileApps: {
      Android: 'https://play.google.com/store/apps/details?id=org.toshi',
      iOS: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
    },
    icon: CoinbaseWallet,
    id: 'coinbase',
    name: 'Coinbase Wallet',
    qrCodeSupported: true,
  };
};
