import {getDefaultConnectors} from '../connectors/getDefaultConnectors';
import {Connector, ConnectorInstance} from '../types/connector';

import {useConnectWallet} from './useConnectWallet';

export function useDefaultConnectors() {
  const {chains} = useConnectWallet();
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
