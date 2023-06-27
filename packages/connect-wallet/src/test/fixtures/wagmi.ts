import {Chain, configureChains, createConfig, mainnet} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

import {
  buildConnectors,
  BuildConnectorsProps,
} from '~/connectors/buildConnectors';

type WagmiFixtureProps = Omit<BuildConnectorsProps, 'chains' | 'projectId'> & {
  chains?: Chain[];
};

export const createWagmiFixture = ({
  appName,
  chains = [mainnet],
  customConnectors,
  excludedConnectors = ['coinbaseWallet'],
}: WagmiFixtureProps) => {
  const {publicClient, webSocketPublicClient} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors, wagmiConnectors} = buildConnectors({
    appName,
    chains,
    customConnectors,
    excludedConnectors,
    projectId: '',
  });

  const config = createConfig({
    autoConnect: true,
    connectors: wagmiConnectors,
    publicClient,
    webSocketPublicClient,
  });

  return {chains, config, connectors};
};
