import {OrderAttributionMode} from '../../types/orderAttribution';

import {attributeOrder} from './attributeOrder';
import {gateContextClient} from './gateContextClient';

jest.mock('./gateContextClient', () => {
  return {
    gateContextClient: {
      write: jest.fn(() => Promise.resolve({})),
    },
  };
});

describe('attributeOrder', () => {
  // Removes the orderAttribution console.error from the test output.
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

  afterAll(() => jest.clearAllMocks());

  describe('when orderAttributionMode is required', () => {
    it('calls gateContextClient.write', async () => {
      const write = mockWrite();
      await executeThunk();
      expect(write).toHaveBeenCalledTimes(1);
    });

    it('returns address in the payload', async () => {
      mockWrite();
      const result = await executeThunk();

      expect(result.type).toBe('wallet/attributeOrder/fulfilled');
      expect(result.payload).toStrictEqual({
        orderAttributionMode: 'required',
        address: '0x123',
      });
      expect(result.meta.requestStatus).toBe('fulfilled');
    });

    it('fails on errors', async () => {
      const write = mockWrite(() => Promise.reject(new Error('error')));
      const result = await executeThunk(
        defaultAttributeOrder({orderAttributionMode: 'required'}),
      );
      expect(result.type).toBe('wallet/attributeOrder/rejected');
      expect(write).toHaveBeenCalledTimes(1);
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
}: {orderAttributionMode?: OrderAttributionMode} = {}) {
  const wallet = {
    address: '0x123',
  };

  return attributeOrder({wallet, orderAttributionMode});
}

function executeThunk(
  thunk: ReturnType<typeof defaultAttributeOrder> = defaultAttributeOrder(),
) {
  return thunk(jest.fn(), jest.fn(), {});
}

function mockWrite(
  internalWrite: (...args: any) => unknown = () => Promise.resolve({}),
) {
  const write = jest.fn(internalWrite);
  (gateContextClient.write as jest.Mock).mockImplementation(write);
  return write;
}
