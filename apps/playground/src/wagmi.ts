import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createConfig, mainnet} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [publicProvider()],
);

const {connectors, wagmiConnectors} = buildConnectors({
  chains,
  projectId: 'dbf42c2e9b880f42b63ffcd497dd2c97',
});

const config = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient,
  webSocketPublicClient,
});

export {chains, config, connectors};
