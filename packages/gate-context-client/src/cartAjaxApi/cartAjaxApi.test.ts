import fetchMock from 'jest-fetch-mock';

import {getGateContextCartAjaxClient} from './cartAjaxApi';

describe('AjaxAPI', () => {
  beforeEach(() => fetchMock.resetMocks());

  const gateContextAjaxClient = getGateContextCartAjaxClient({
    backingStore: 'ajaxApi',
    shopifyGateContextGenerator: (data) => Promise.resolve({...data}),
  });

  describe('write', () => {
    it('performs a fetch', async () => {
      mockFetch();

      await gateContextAjaxClient.write(gateContextData());
      expect(fetchMock.mock.calls).toHaveLength(1);
    });

    it('performs a fetch to update.js', async () => {
      mockFetch();

      await gateContextAjaxClient.write(gateContextData());
      expect(fetchMock.mock.calls[0]?.[0]).toContain('cart/update.js');
    });

    it('returns the response in raw form', async () => {
      const expected = {hello: 'world'};
      mockFetch(expected);

      const result = await gateContextAjaxClient.write(gateContextData());
      expect(result.raw).toStrictEqual(expected);
    });

    it('performs a fetch with a body containing the wallet address', async () => {
      mockFetch();
      const data = gateContextData();

      await gateContextAjaxClient.write(data);
      expect(fetchMock.mock.calls[0][1]?.body).toBeDefined();
      expect(fetchMock.mock.calls[0][1]!.body).toStrictEqual(
        JSON.stringify({
          attributes: {
            'Wallet Address': data.walletAddress,
            _shopify_gate_context: data,
          },
        }),
      );
    });
  });
});

function gateContextData() {
  return {
    walletAddress: '0x123',
    walletVerificationMessage: 'message',
    walletVerificationSignature: 'signature',
  };
}

function mockFetch(expected: any = {}) {
  fetchMock.mockResponseOnce(JSON.stringify(expected));
}
