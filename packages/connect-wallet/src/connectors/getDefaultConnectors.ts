import {Connector as WagmiConnector} from 'wagmi';

import {Connector, ConnectorProps} from '../types/connector';
import {buildConnectors} from './buildConnectors';

interface GetDefaultConnectorsSignature {
  availableConnectors: Connector[];
  connectors: WagmiConnector[];
}

export const getDefaultConnectors = ({
  appName,
  chains,
}: ConnectorProps): GetDefaultConnectorsSignature => {
  const {connectors: availableConnectors, wagmiConnectors: connectors} =
    buildConnectors({
      appName,
      chains,
      includeDefaults: true,
    });

  return {
    availableConnectors,
    connectors,
  };
};
