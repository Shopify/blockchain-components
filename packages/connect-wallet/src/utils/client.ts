import type {PublicClient} from 'viem';
import {Chain} from 'wagmi';

interface ProviderCheckProps {
  chain: Chain;
  client: PublicClient;
}

// Detects if a given provider is utilizing only the default provider
export const isDefaultClient = ({chain, client}: ProviderCheckProps) => {
  const defaultUrl = chain.rpcUrls.default.http[0];

  const isUsingDefaultUrl = (url: string) => url === defaultUrl;

  if (client.transport.type === 'fallback') {
    return client.transport.transports.every(
      (transport: PublicClient['transport']) =>
        isUsingDefaultUrl(transport.value.url),
    );
  }

  return isUsingDefaultUrl(client.transport.url);
};
