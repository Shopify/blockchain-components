import {getDefaultConnectors} from '../connectors/getDefaultConnectors';
import {useWalletConnection} from '../providers/WalletConnectionProvider';
import {Connector, ConnectorInstance} from '../types/connector';

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
