import {useConnectorData} from './useConnectorData';

import {
  CHAINS,
  CUSTOM_CONNECTOR,
  DEFAULT_CONNECTOR_COLLECTION,
} from '~/test/fixtures/connector';
import {createWagmiFixture} from '~/test/fixtures/wagmi';
import {renderHookWithContext} from '~/test/utils';

describe.skip('useConnectorData', () => {
  it('returns custom connector id', () => {
    const {config} = createWagmiFixture({customConnectors: [CUSTOM_CONNECTOR]});

    const {result} = renderHookWithContext(
      () => useConnectorData({id: CUSTOM_CONNECTOR.id}),
      {
        chains: CHAINS,
        config,
        connectors: [CUSTOM_CONNECTOR],
      },
    );

    expect(result.current).toEqual(expect.objectContaining(CUSTOM_CONNECTOR));
  });

  it('returns correct data based on id for default connectors', () => {
    const {config, connectors} = createWagmiFixture({});

    DEFAULT_CONNECTOR_COLLECTION.forEach((id) => {
      const {result} = renderHookWithContext(() => useConnectorData({id}), {
        chains: CHAINS,
        config,
        connectors,
      });

      expect(result.current).toEqual(expect.objectContaining({id}));
    });
  });
});
