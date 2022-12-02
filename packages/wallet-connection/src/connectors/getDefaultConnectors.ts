import {Chain, Connector as WagmiConnector} from 'wagmi';

import {ConnectorInstance} from '../types/connector';

import {MetaMask} from './metaMask';
import {WalletConnect} from './walletConnect';

export const getDefaultConnectors = ({chains}: {chains: Chain[]}) => {
  const connectors: WagmiConnector[] = [];
  const availableConnectors = [MetaMask({chains}), WalletConnect({chains})];

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

      // FIX THIS.
      // Check for the serialized options to match as well.
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
