import {ConnectWalletProvider} from '@shopify/connect-wallet';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {WagmiConfig} from 'wagmi';

import '@shopify/connect-wallet/styles.css';

import {AnalyticsListener} from './components/AnalyticsListener';
import App from './App';
import './index.css';
import {eventBus} from './utils/eventBus/eventBus';
import {chains, connectors, client} from './wagmi';

window.playground = {
  ThemeAppExtension: class ThemeAppExtension {
    private readonly arguments;
    private root: ReactDOM.Root | undefined;

    constructor(args: any) {
      this.arguments = args;
    }

    mount() {
      const container = document.getElementById(this.arguments.containerId);
      if (!container) return;

      this.root = ReactDOM.createRoot(container as HTMLElement);
      this.root.render(this.AppWithProviders({}));

      // Setup event gm-shop-merchant-app event bus
      // eslint-disable-next-line no-console
      console.log('Event bus initialized');
      this.arguments?.setupEventBus?.(eventBus);
    }

    update(updatedProps: any) {
      this.root?.render(this.AppWithProviders({updatedProps}));
    }

    private AppWithProviders({updatedProps}: {updatedProps?: any}) {
      return (
        <React.StrictMode>
          <AnalyticsListener />
          <WagmiConfig client={client}>
            <ConnectWalletProvider
              chains={chains}
              connectors={connectors}
              orderAttributionMode="ignoreErrors"
            >
              <App
                serverArguments={{
                  ...this.arguments,
                  initialState: {
                    ...this.arguments.initialState,
                    ...updatedProps,
                  },
                }}
              />
            </ConnectWalletProvider>
          </WagmiConfig>
        </React.StrictMode>
      );
    }
  },
};
