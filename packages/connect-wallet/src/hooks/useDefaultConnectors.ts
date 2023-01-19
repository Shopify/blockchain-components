import {useContext} from 'react';

import {getDefaultConnectors} from '../connectors/getDefaultConnectors';
import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {Connector, ConnectorInstance} from '../types/connector';

export function useDefaultConnectors() {
  const {chains} = useContext(ConnectWalletContext);
  const {availableConnectors} = getDefaultConnectors({chains});

  const connectors: Connector[] = [];

  availableConnectors.forEach(
    ({createConnector, ...provided}: ConnectorInstance) => {
      const connector = createConnector();

      connectors.push({...provided, connector});
    },
  );

  return {
    connectors,
  };
}
