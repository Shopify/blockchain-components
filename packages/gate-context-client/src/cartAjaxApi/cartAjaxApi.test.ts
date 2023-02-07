import fetchMock from 'jest-fetch-mock';

import {undefinedGateContextGenerator} from '../index';

import {getGateContextCartAjaxClient} from './cartAjaxApi';
import {CartAjaxApiError, CartAjaxApiNotSupportedError} from './errors';

const mockShopifyValue = {
  routes: {
    root: '',
  },
};

// This is a global that is available on Online store pages.
(window as any).Shopify = mockShopifyValue;

describe('AjaxAPI', () => {
  beforeEach(() => fetchMock.resetMocks());

  const gateContextAjaxClient = getGateContextCartAjaxClient({
    backingStore: 'ajaxApi',
    shopifyGateContextGenerator: (data) => Promise.resolve({...data}),
  });

  describe('read', () => {
    const validResponse = (_shopify_gate_context = '{"myprop": 1}') => ({
      token: '123',
      attributes: {_shopify_gate_context},
    });

    it('performs a fetch', async () => {
      mockFetch(validResponse());

      await gateContextAjaxClient.read();
      expect(fetchMock.mock.calls).toHaveLength(1);
    });

    it('returns the gate context', async () => {
      const mockResponse = validResponse();
      mockFetch(mockResponse);

      const response = await gateContextAjaxClient.read();
      expect(response).toStrictEqual(
        JSON.parse(mockResponse.attributes._shopify_gate_context),
      );
    });

    it('errors when the shopify gate context has invalid JSON', async () => {
      mockFetch(validResponse('{)'));
      const result = gateContextAjaxClient.read();
      await expect(result).rejects.toBeInstanceOf(SyntaxError);
    });

    it('returns undefined when the shopify gate context is present', async () => {
      mockFetch({token: validResponse().token, attributes: {}});
      const result = gateContextAjaxClient.read();
      expect(await result).toBeUndefined();
    });

    it('errors when the response is invalid', async () => {
      mockFetch();
      const result = gateContextAjaxClient.read();
      await expect(result).rejects.toBeInstanceOf(CartAjaxApiError);
    });
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
            _shopify_gate_context: JSON.stringify(data),
          },
        }),
      );
    });

    it('performs a fetch with a body NOT containing shopify gate context', async () => {
      const gateContextAjaxClient = getGateContextCartAjaxClient({
        backingStore: 'ajaxApi',
        shopifyGateContextGenerator: undefinedGateContextGenerator,
      });
      mockFetch();
      const data = gateContextData();

      await gateContextAjaxClient.write(data);
      expect(fetchMock.mock.calls[0][1]?.body).toBeDefined();
      expect(fetchMock.mock.calls[0][1]!.body).toStrictEqual(
        JSON.stringify({
          attributes: {
            'Wallet Address': data.walletAddress,
          },
        }),
      );
    });
  });

  describe('non-shopify store', () => {
    beforeAll(() => {
      (window as any).Shopify = undefined;
    });

    afterAll(() => {
      (window as any).Shopify = mockShopifyValue;
    });

    describe('read', () => {
      it('errors due to api not supported', async () => {
        const result = gateContextAjaxClient.read();
        await expect(result).rejects.toBeInstanceOf(
          CartAjaxApiNotSupportedError,
        );
      });
    });

    describe('write', () => {
      it('errors due to api not supported', async () => {
        const result = gateContextAjaxClient.write({} as any);
        await expect(result).rejects.toBeInstanceOf(
          CartAjaxApiNotSupportedError,
        );
      });
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
