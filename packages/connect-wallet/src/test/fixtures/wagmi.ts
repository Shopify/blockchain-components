import {
  buildConnectors,
  BuildConnectorsProps,
} from 'src/connectors/buildConnectors';
import {Chain, configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

type WagmiFixtureProps = Omit<BuildConnectorsProps, 'chains'> & {
  chains?: Chain[];
};

export const createWagmiFixture = ({
  appName,
  chains = [mainnet],
  customConnectors,
  excludedConnectors = ['coinbaseWallet'],
}: WagmiFixtureProps) => {
  const {provider, webSocketProvider} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors, wagmiConnectors} = buildConnectors({
    appName,
    chains,
    customConnectors,
    excludedConnectors,
  });

  const client = createClient({
    autoConnect: true,
    connectors: wagmiConnectors,
    provider,
    webSocketProvider,
  });

  return {chains, client, connectors};
};
