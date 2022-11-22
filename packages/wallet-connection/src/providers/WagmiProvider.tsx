/**
 * This is code related to the WagmiClient that was previously location inside of WAlletConnectionProvider.
 * It appears that we cannot pre-create a WagmiClient on behalf of consumers, at least not with the wagmi react package.
 * I will likely look to create an implementation using the @agmi/core package and ship that default client instead.
 */

import {FC, PropsWithChildren, useMemo} from 'react';
import {configureChains, createClient, defaultChains, WagmiConfig} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {publicProvider} from 'wagmi/providers/public';

import {defaultConnectors} from '../constants/defaults';
import {ProviderProps} from '../types/provider';

export const WagmiProvider: FC<PropsWithChildren<ProviderProps>> = ({
  alchemyApiKey,
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
    // This should be re-enabled when we are adding support for ENS resolution
    // if (!alchemyApiKey && !infuraApiKey) {
    //   console.warn(WarningMessage.PublicProviderOnly);
    // }

    return chains;
  }, [alchemyApiKey, infuraApiKey]);

  // Memoize the configureChains to prevent from unnecessary re-renders.
  // Since we're allowing the providers to be created dynamically and
  // pass props to them, we need to ensure that this is within the context of the provider.
  const {chains, provider, webSocketProvider} = configureChains(
    defaultChains,
    chainProviders,
  );

  const client = createClient({
    autoConnect: true,
    connectors: defaultConnectors({chains}),
    provider,
    webSocketProvider,
  });

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
