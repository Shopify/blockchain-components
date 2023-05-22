import {vi} from 'vitest';
import type {Mock} from 'vitest';

import {attributeOrder, gateContextClient} from './attributeOrder';

import {OrderAttributionMode} from '~/types/orderAttribution';
import {ConnectWalletError} from '~/utils/error';

vi.mock('@shopify/gate-context-client', async (importActual) => {
  const mod = await importActual();

  return {
    ...(mod as any),
    write: vi.fn(),
  };
});

describe('attributeOrder', () => {
  // Removes the orderAttribution console.error from the test output.
  beforeAll(() => {
    vi.spyOn(gateContextClient, 'write');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('when orderAttributionMode is required', () => {
    it('calls gateContextClient.write', async () => {
      const write = mockWrite();
      await defaultAttributeOrder();
      expect(write).toHaveBeenCalledTimes(1);
    });

    it('fails on errors', async () => {
      const write = mockWrite(() => Promise.reject(new Error('error')));
      await expect(defaultAttributeOrder()).rejects.toThrow(
        new ConnectWalletError('error'),
      );
      expect(write).toHaveBeenCalledTimes(1);
    });

    describe('when vault addresses are not defined', () => {
      it('returns address without vaults in the payload', async () => {
        mockWrite();
        const result = await defaultAttributeOrder();

        expect(result).toStrictEqual({
          orderAttributionMode: 'required',
          address: '0x123',
          vaults: undefined,
        });
      });
    });

    describe('when vault addresses are defined', () => {
      it('returns address with vaults in the payload', async () => {
        mockWrite();
        const result = await defaultAttributeOrder({withVaults: true});

        expect(result).toStrictEqual({
          orderAttributionMode: 'required',
          address: '0x123',
          vaults: ['0x456', '0x789'],
        });
      });
    });
  });

  describe('when orderAttributionMode is disabled', () => {
    it('does not call gateContextClient.write', async () => {
      const write = mockWrite();
      await defaultAttributeOrder({orderAttributionMode: 'disabled'});
      expect(write).not.toHaveBeenCalled();
    });
  });

  describe('when orderAttributionMode is ignoreErrors', () => {
    it('calls gateContextClient.write', async () => {
      const write = mockWrite();
      await defaultAttributeOrder();
      expect(write).toHaveBeenCalledTimes(1);
    });

    it('ignores write errors', async () => {
      const write = mockWrite(() => Promise.reject(new Error('error')));
      await defaultAttributeOrder({orderAttributionMode: 'ignoreErrors'});
      expect(write).toHaveBeenCalledTimes(1);
    });
  });
});

async function defaultAttributeOrder({
  orderAttributionMode = 'required',
  withVaults = false,
}: {orderAttributionMode?: OrderAttributionMode; withVaults?: boolean} = {}) {
  const wallet = {
    address: '0x123',
    ...(withVaults && {vaults: ['0x456', '0x789']}),
  };

  const response = await attributeOrder({wallet, orderAttributionMode});

  return response;
}

function mockWrite(
  internalWrite: (...args: any) => unknown = () => Promise.resolve({}),
) {
  const write = vi.fn(internalWrite);
  (gateContextClient.write as Mock).mockImplementation(write);
  return write;
}
