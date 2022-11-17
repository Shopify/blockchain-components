import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {ThemeProvider} from 'styled-components';
import {
  configureChains,
  createClient,
  defaultChains,
  Connector,
  WagmiConfig,
} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {publicProvider} from 'wagmi/providers/public';

import {ModalProvider} from './ModalProvider';

import {defaultConnectors} from '../constants/defaults';
import {WarningMessage} from '../constants/warnings';
import {GlobalStyle} from '../style/global';
import {Polaris} from '../themes/polaris';
import {ProviderProps} from '../types/provider';

export interface WalletConnectionProviderValue {
  pendingConnector?: Connector;
  setPendingConnector: Dispatch<SetStateAction<Connector | undefined>>;
}

const defaultContextValue: WalletConnectionProviderValue = {
  pendingConnector: undefined,
  setPendingConnector: () => {},
};

export const WalletConnectionContext =
  createContext<WalletConnectionProviderValue>(defaultContextValue);

export const WalletConnectionProvider: FC<PropsWithChildren<ProviderProps>> = ({
  alchemyApiKey,
  connectors,
  children,
  infuraApiKey,
}: PropsWithChildren<ProviderProps>) => {
  const [pendingConnector, setPendingConnector] = useState<
    Connector | undefined
  >();

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

  return (
    <WagmiConfig client={client}>
      <WalletConnectionContext.Provider
        value={{pendingConnector, setPendingConnector}}
      >
        <ThemeProvider theme={Polaris}>
          <GlobalStyle />
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </WalletConnectionContext.Provider>
    </WagmiConfig>
  );
};

export const useWalletConnection = () => {
  const context = useContext(WalletConnectionContext);
  if (!context) throw Error('WalletConnection context not present.');
  return context;
};
