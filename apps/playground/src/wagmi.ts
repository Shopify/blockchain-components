import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createConfig, mainnet} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [publicProvider()],
);

const {connectors, wagmiConnectors} = buildConnectors({
  chains,
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
});

const config = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient,
  webSocketPublicClient,
});

export {chains, config, connectors};
