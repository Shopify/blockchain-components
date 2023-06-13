import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createConfig} from 'wagmi';
import {mainnet} from 'wagmi/chains';
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

const {connectors, wagmiConnectors} = buildConnectors({chains});

const config = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient,
  webSocketPublicClient,
});

export {chains, config, connectors};
