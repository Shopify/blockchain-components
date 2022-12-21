import {getDefaultConnectors} from '@shopify/connect-wallet';
import {chain, configureChains, createClient} from 'wagmi';
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';

const {chains, provider, webSocketProvider} = configureChains(
  [chain.mainnet],
  [
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

const {connectors} = getDefaultConnectors({chains});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export {chains, client};
