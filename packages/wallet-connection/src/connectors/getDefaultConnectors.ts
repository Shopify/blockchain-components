import {Connector as WagmiConnector} from 'wagmi';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

import {Coinbase} from './coinbase';
import {MetaMask} from './metaMask';
import {Rainbow} from './rainbow';
import {WalletConnect} from './walletConnect';

export const getDefaultConnectors = ({appName, chains}: ConnectorProps) => {
  const connectors: WagmiConnector[] = [];
  const availableConnectors = [
    MetaMask({chains}),
    Coinbase({appName, chains}),
    Rainbow({chains}),
    WalletConnect({chains}),
  ];

  availableConnectors.forEach(({createConnector}: ConnectorInstance) => {
    const createdConnector = createConnector();
    const isWalletConnect = createdConnector.id === 'walletConnect';

    if (isWalletConnect) {
      /**
       * Since we're reusing wallet connect connectors we should check if
       * this connector is already inside of connectors.
       *
       * Context: MetaMask on mobile, Rainbow, etc. will use WalletConnect bridge
       * and need to use a WC connector. These are all going to use the same WC
       * connector from Wagmi. But, WalletConnect itself will use two different
       * WC connectors. One for support with WalletConnect's modal and one without.
       */

      // When we begin adding more connectors (e.g. Ledger, Rainbow, etc.) we should
      // take a look at this code again to make sure we're seeing the expected connectors.
      // We should always have TWO walletConnect connectors (one with a qr code and one without).
      if (connectors.some((item) => item.id === 'walletConnect')) {
        return;
      }
    }

    connectors.push(createdConnector);
  });

  return {
    availableConnectors,
    connectors,
  };
};
