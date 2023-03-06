import {buildConnectors} from '@shopify/connect-wallet';
// import type {CustomConnector} from '@shopify/connect-wallet';
import {configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
// import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';
// import {Argent} from './assets/Argent';

const {chains, provider, webSocketProvider} = configureChains(
  [mainnet],
  [
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

// const argentConnector: CustomConnector = {
//   id: 'argent',
//   name: 'Argent',
//   connector: new WalletConnectConnector({chains, options: {qrcode: false}}),
//   icon: Argent,
//   qrCodeSupported: true,
// };

const {connectors, wagmiConnectors} = buildConnectors({
  chains,
  // customConnectors: [argentConnector],
});

const client = createClient({
  autoConnect: true,
  connectors: wagmiConnectors,
  provider,
  webSocketProvider,
});

export {chains, client, connectors};
