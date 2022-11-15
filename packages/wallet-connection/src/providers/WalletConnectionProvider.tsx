import {PropsWithChildren, useMemo} from 'react';
import {configureChains, createClient, defaultChains, WagmiConfig} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {publicProvider} from 'wagmi/providers/public';

import {defaultConnectors} from '../constants/defaults';
import {WarningMessage} from '../constants/warnings';
import {ProviderProps} from '../types/provider';

export const WalletConnectionProvider = ({
  alchemyApiKey,
  connectors,
  children,
  infuraApiKey,
}: PropsWithChildren<ProviderProps>) => {
  const chainProviders = useMemo(() => {
    let chains = [];

    if (alchemyApiKey) {
      chains.push(alchemyProvider({apiKey: alchemyApiKey}));
    }

    if (infuraApiKey) {
      chains.push(infuraProvider({apiKey: infuraApiKey}));
    }

    chains.push(publicProvider());

    // If the developer has not elected to include either an alchemy or infura key
    // provide a warning in the console to the developer about potential rate limiting.
    if (!alchemyApiKey && !infuraApiKey) {
      console.warn(WarningMessage.PublicProviderOnly);
    }

    return chains;
  }, [alchemyApiKey, infuraApiKey]);

  // Memoize the configureChains to prevent from unnecessary re-renders.
  // Since we're allowing the providers to be created dynamically and
  // pass props to them, we need to ensure that this is within the context of the provider.
  const {chains, provider, webSocketProvider} = useMemo(
    () => configureChains(defaultChains, chainProviders),
    [chainProviders],
  );

  const client = useMemo(() => {
    return createClient({
      autoConnect: true,
      connectors: connectors || defaultConnectors({chains}),
      provider,
      webSocketProvider,
    });
  }, [chains, connectors, provider, webSocketProvider]);

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
