import {WalletConnectionProvider} from '@shopify/wallet-connection';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {WagmiConfig} from 'wagmi';

import App from './App';
import './index.css';
import {eventBus} from './utils/eventBus/eventBus';
import {chains, client} from './wagmi';

window.gmShop = {
  ThemeAppExtension: class ThemeAppExtension {
    private arguments;
    private root: ReactDOM.Root | undefined;

    private AppWithProviders({updatedProps}: {updatedProps?: any}) {
      return (
        <React.StrictMode>
          <WagmiConfig client={client}>
            <WalletConnectionProvider
              chains={chains}
              wallet={this.arguments?.initialState?.wallet || undefined}
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
            </WalletConnectionProvider>
          </WagmiConfig>
        </React.StrictMode>
      );
    }

    constructor(args: any) {
      this.arguments = args;
    }

    mount() {
      const container = document.getElementById(this.arguments.containerId);
      if (!container) return;

      this.root = ReactDOM.createRoot(container as HTMLElement);
      this.root.render(this.AppWithProviders({}));

      // Setup event gm-shop-merchant-app event bus
      console.log('Event bus initialized');
      this.arguments?.setupEventBus?.(eventBus);
    }

    update(updatedProps: any) {
      this.root?.render(this.AppWithProviders({updatedProps}));
    }
  },
};
