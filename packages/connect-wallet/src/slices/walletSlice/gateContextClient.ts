import {
  getGateContextClient,
  undefinedGateContextGenerator,
} from '@shopify/gate-context-client';

const defaultClientBuilder = () =>
  getGateContextClient({
    backingStore: 'ajaxApi',
    shopifyGateContextGenerator: undefinedGateContextGenerator,
  });

export const gateContextClient = defaultClientBuilder();
