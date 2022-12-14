import {useMemo} from 'react';

import {ConnectorInstance} from '../types/connector';

import {useDefaultConnectors} from './useDefaultConnectors';

type UseConnectorDataResponse = Omit<
  ConnectorInstance,
  'createConnector' | 'modalConnector'
>;

/**
 * A hook for accessing connector data (e.g. icons, mobile links, etc.) outside
 * of the pendingConnector.
 */
export function useConnectorData({id}: {id: string}): UseConnectorDataResponse {
  const {connectors} = useDefaultConnectors();

  const connectorData = useMemo(() => {
    // Search our collection of connectors for a matching id (e.g. `rainbowWallet` or `metaMask`).
    const connector = connectors.find((item) => item.id === id);

    if (connector) {
      const {
        browserExtensions,
        icon,
        id,
        marketingSite,
        mobileApps,
        name,
        qrCodeSupported,
      } = connector;

      return {
        browserExtensions,
        icon,
        id,
        marketingSite,
        mobileApps,
        name,
        qrCodeSupported,
      };
    }

    return {
      icon: null,
      id: 'unknown',
      name: 'Unknown',
      qrCodeSupported: false,
    };
  }, [connectors, id]);

  return connectorData;
}
