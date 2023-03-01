import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';

const {chains, provider, webSocketProvider} = configureChains(
  [mainnet],
  [
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

const {connectors, wagmiConnectors} = buildConnectors({appName: '', chains});

const client = createClient({
  autoConnect: true,
  connectors: wagmiConnectors,
  provider,
  webSocketProvider,
});



export {chains, client, connectors};
