import {GateContextClient} from '@shopify/gate-context-client';
import {renderHook} from '@testing-library/react';

import {useOrderAttribution} from './useOrderAttribution';

describe('useOrderAttribution', () => {
  it('returns a callback for client.write', () => {
    const {result} = renderHook(() => useOrderAttribution());
    expect(result.current).toBeInstanceOf(Function);
  });

  it('invoking the callback executes client.write', async () => {
    const write = jest.fn(() => Promise.resolve({}));
    const clientBuilder = () =>
      ({
        write,
      } as unknown as GateContextClient);
    const {result} = renderHook(() => useOrderAttribution({clientBuilder}));

    await result.current({address: '0x123'});

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith({walletAddress: '0x123'});
  });
});
