import {
  getGateContextClient,
  emptyGateContextGenerator,
  GateContextClient,
} from '@shopify/gate-context-client';
import {useCallback, useMemo} from 'react';

const defaultClientBuilder = () =>
  getGateContextClient<object>({
    backingStore: 'ajaxApi',
    shopifyGateContextGenerator: emptyGateContextGenerator,
  });

interface Props {
  clientBuilder?: () => GateContextClient;
}

export const useOrderAttribution = (
  {clientBuilder = defaultClientBuilder}: Props = {
    clientBuilder: defaultClientBuilder,
  },
) => {
  const client = useMemo(clientBuilder, [clientBuilder]);
  const write = useCallback(
    async ({address}: {address: string}) => {
      await client.write({
        walletAddress: address,
      });
    },
    [client],
  );

  return write;
};
