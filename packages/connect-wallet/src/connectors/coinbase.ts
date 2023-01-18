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
    marketingSite: 'https://www.coinbase.com/wallet',
    icon: CoinbaseWallet,
    id: 'coinbase',
    name: 'Coinbase Wallet',
    qrCodeSupported: true,
  };
};
