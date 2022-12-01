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

    constructor(args: any) {
      this.arguments = args;
    }

    mount() {
      const container = document.getElementById(this.arguments.containerId);
      if (!container) return;

      const root = ReactDOM.createRoot(container as HTMLElement);
      root.render(
        <React.StrictMode>
          <WagmiConfig client={client}>
            <WalletConnectionProvider
              chains={chains}
              wallet={this.arguments?.initialState?.wallet || undefined}
            >
              <App serverArguments={this.arguments} />
            </WalletConnectionProvider>
          </WagmiConfig>
        </React.StrictMode>,
      );

      // Setup event gm-shop-merchant-app event bus
      console.log('Event bus initialized');
      this.arguments?.setupEventBus?.(eventBus);
    }
  },
};
