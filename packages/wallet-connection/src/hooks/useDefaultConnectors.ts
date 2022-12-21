import {getDefaultConnectors} from '../connectors/getDefaultConnectors';
import {Connector, ConnectorInstance} from '../types/connector';

import {useWalletConnection} from './useWalletConnection';

export function useDefaultConnectors() {
  const {chains} = useWalletConnection();
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
