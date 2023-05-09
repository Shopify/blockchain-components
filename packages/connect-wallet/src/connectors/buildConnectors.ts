import type {Connector as WagmiConnector} from 'wagmi';

import {Coinbase} from './coinbase';
import {LedgerLive} from './ledgerLive';
import {MetaMask} from './metaMask';
import {Rainbow} from './rainbow';
import {WalletConnect} from './walletConnect';

import type {
  Connector,
  ConnectorInstance,
  ConnectorProps,
  CustomConnector,
} from '~/types/connector';
import {ConnectWalletError} from '~/utils/error';

interface BuildConnectorsWithDefaults extends ConnectorProps {
  customConnectors?: CustomConnector[];
  excludedConnectors?: string[];
  includeDefaults?: true;
}

interface BuildConnectorsWithoutDefaults extends ConnectorProps {
  customConnectors: CustomConnector[];
  excludedConnectors?: never;
  includeDefaults: false;
}

export type BuildConnectorsProps =
  | BuildConnectorsWithDefaults
  | BuildConnectorsWithoutDefaults;

interface BuildConnectorsSignature {
  connectors: Connector[];
  wagmiConnectors: WagmiConnector[];
}

const extractWagmiConnectors = (connectors: Connector[]): WagmiConnector[] => {
  return connectors.map((connector) => connector.connector);
};

export const buildConnectors = ({
  appName,
  chains,
  customConnectors,
  excludedConnectors,
  includeDefaults = true,
}: BuildConnectorsProps): BuildConnectorsSignature => {
  const connectors: Connector[] = customConnectors || [];

  if (!includeDefaults) {
    if (!customConnectors?.length) {
      console.error(
        new ConnectWalletError(
          'buildConnectors was invoked without customConnectors and includeDefaults as false. No connectors were returned.',
        ),
      );
    }

    const wagmiConnectors = extractWagmiConnectors(connectors);

    return {
      connectors,
      wagmiConnectors,
    };
  }

  const defaultAvailableConnectors = [
    MetaMask({chains}),
    Coinbase({appName, chains}),
    Rainbow({chains}),
    LedgerLive({chains}),
    WalletConnect({chains}),
  ];

  defaultAvailableConnectors.forEach(
    ({createConnector, id, ...provided}: ConnectorInstance) => {
      if (excludedConnectors?.includes(id)) {
        return;
      }

      if (connectors.some(({id: customId}) => customId === id)) {
        return;
      }

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

      connectors.push({...provided, id, connector: createdConnector});
    },
  );

  const wagmiConnectors = extractWagmiConnectors(connectors);

  return {
    connectors,
    wagmiConnectors,
  };
};
