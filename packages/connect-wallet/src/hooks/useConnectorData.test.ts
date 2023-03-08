import {
  CHAINS,
  CUSTOM_CONNECTOR,
  DEFAULT_CONNECTOR_COLLECTION,
} from '../test/fixtures/connector';
import {createWagmiFixture} from '../test/fixtures/wagmi';

import {renderHookWithContext} from '../test/utils';

import {useConnectorData} from './useConnectorData';

describe('useConnectorData', () => {
  it('returns custom connector id', () => {
    const {client} = createWagmiFixture({customConnectors: [CUSTOM_CONNECTOR]});

    const {result} = renderHookWithContext(
      () => useConnectorData({id: CUSTOM_CONNECTOR.id}),
      {
        chains: CHAINS,
        client,
        connectors: [CUSTOM_CONNECTOR],
      },
    );

    expect(result.current).toEqual(expect.objectContaining(CUSTOM_CONNECTOR));
  });

  it('returns correct data based on id for default connectors', () => {
    const {client, connectors} = createWagmiFixture({});

    DEFAULT_CONNECTOR_COLLECTION.forEach((id) => {
      const {result} = renderHookWithContext(() => useConnectorData({id}), {
        chains: CHAINS,
        client,
        connectors,
      });

      expect(result.current).toEqual(expect.objectContaining({id}));
    });
  });
});
