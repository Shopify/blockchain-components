import {vi} from 'vitest';

import {buildConnectors} from './buildConnectors';

import {CHAINS, CUSTOM_CONNECTOR} from '~/test/fixtures/connector';
import type {Connector} from '~/types/connector';

const extractConnectorIds = (connectors: Connector[]) => {
  return connectors.map((connector) => connector.id);
};

describe('buildConnectors', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when includeDefaults is true', () => {
    it('returns list of default connectors', () => {
      const {connectors, wagmiConnectors} = buildConnectors({
        chains: CHAINS,
        includeDefaults: true,
      });

      const connectorIds = extractConnectorIds(connectors);
      const expectedConnectorsIds = [
        'metaMask',
        'coinbaseWallet',
        'rainbow',
        'ledger',
        'walletConnect',
      ];

      expect(connectorIds).toEqual(expectedConnectorsIds);
      expect(wagmiConnectors).toHaveLength(5);
    });

    it('returns list of filtered default connectors when excluded connectors are provided', () => {
      const {connectors, wagmiConnectors} = buildConnectors({
        chains: CHAINS,
        excludedConnectors: ['metaMask'],
        includeDefaults: true,
      });

      const connectorIds = extractConnectorIds(connectors);
      const expectedConnectorsIds = [
        'coinbaseWallet',
        'rainbow',
        'ledger',
        'walletConnect',
      ];

      expect(connectorIds).toEqual(expectedConnectorsIds);
      expect(wagmiConnectors).toHaveLength(4);
    });

    it('returns list of custom connectors and default connectors when custom connectors are provided', () => {
      const {connectors, wagmiConnectors} = buildConnectors({
        chains: CHAINS,
        customConnectors: [CUSTOM_CONNECTOR],
        includeDefaults: true,
      });

      const connectorIds = extractConnectorIds(connectors);
      const expectedConnectorsIds = [
        'customConnector',
        'metaMask',
        'coinbaseWallet',
        'rainbow',
        'ledger',
        'walletConnect',
      ];

      expect(connectorIds).toEqual(expectedConnectorsIds);
      expect(wagmiConnectors).toHaveLength(6);
    });
  });

  describe('when includeDefaults is false', () => {
    it('returns list of custom connectors', () => {
      const {connectors, wagmiConnectors} = buildConnectors({
        chains: CHAINS,
        customConnectors: [CUSTOM_CONNECTOR],
        includeDefaults: false,
      });

      const connectorIds = extractConnectorIds(connectors);
      const expectedConnectorsIds = ['customConnector'];

      expect(connectorIds).toEqual(expectedConnectorsIds);
      expect(wagmiConnectors).toHaveLength(1);
    });
  });
});
