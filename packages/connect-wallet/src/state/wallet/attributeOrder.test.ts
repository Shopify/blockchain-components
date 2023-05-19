import {vi} from 'vitest';
import type {Mock} from 'vitest';

import {attributeOrder} from './attributeOrder';
import {gateContextClient} from './gateContextClient';

import {OrderAttributionMode} from '~/types/orderAttribution';

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
      await executeThunk();
      expect(write).toHaveBeenCalledTimes(1);
    });

    it('fails on errors', async () => {
      const write = mockWrite(() => Promise.reject(new Error('error')));
      const result = await executeThunk(
        defaultAttributeOrder({orderAttributionMode: 'required'}),
      );
      expect(result.type).toBe('wallet/attributeOrder/rejected');
      expect(write).toHaveBeenCalledTimes(1);
    });

    describe('when vault addresses are not defined', () => {
      it('returns address without vaults in the payload', async () => {
        mockWrite();
        const result = await executeThunk();

        expect(result.type).toBe('wallet/attributeOrder/fulfilled');
        expect(result.payload).toStrictEqual({
          orderAttributionMode: 'required',
          address: '0x123',
          vaults: undefined,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
      });
    });

    describe('when vault addresses are defined', () => {
      it('returns address with vaults in the payload', async () => {
        mockWrite();
        const result = await executeThunk(
          defaultAttributeOrder({withVaults: true}),
        );

        expect(result.type).toBe('wallet/attributeOrder/fulfilled');
        expect(result.payload).toStrictEqual({
          orderAttributionMode: 'required',
          address: '0x123',
          vaults: ['0x456', '0x789'],
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
      });
    });
  });

  describe('when orderAttributionMode is disabled', () => {
    it('does not call gateContextClient.write', async () => {
      const write = mockWrite();
      await executeThunk(
        defaultAttributeOrder({orderAttributionMode: 'disabled'}),
      );
      expect(write).not.toHaveBeenCalled();
    });
  });

  describe('when orderAttributionMode is ignoreErrors', () => {
    it('calls gateContextClient.write', async () => {
      const write = mockWrite();
      await executeThunk(defaultAttributeOrder());
      expect(write).toHaveBeenCalledTimes(1);
    });

    it('ignores write errors', async () => {
      const write = mockWrite(() => Promise.reject(new Error('error')));
      const {type} = await executeThunk(
        defaultAttributeOrder({orderAttributionMode: 'ignoreErrors'}),
      );
      expect(type).toBe('wallet/attributeOrder/fulfilled');
      expect(write).toHaveBeenCalledTimes(1);
    });
  });
});

function defaultAttributeOrder({
  orderAttributionMode = 'required',
  withVaults = false,
}: {orderAttributionMode?: OrderAttributionMode; withVaults?: boolean} = {}) {
  const wallet = {
    address: '0x123',
    ...(withVaults && {vaults: ['0x456', '0x789']}),
  };

  return attributeOrder({wallet, orderAttributionMode});
}

function executeThunk(
  thunk: ReturnType<typeof defaultAttributeOrder> = defaultAttributeOrder(),
) {
  return thunk(vi.fn(), vi.fn(), {});
}

function mockWrite(
  internalWrite: (...args: any) => unknown = () => Promise.resolve({}),
) {
  const write = vi.fn(internalWrite);
  (gateContextClient.write as Mock).mockImplementation(write);
  return write;
}
