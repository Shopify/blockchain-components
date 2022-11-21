import React from 'react';
import ReactDOM from 'react-dom/client';
import {WalletConnectionProvider} from '@shopify/wallet-connection';
import './index.css';
import App from './App';
import {createClient, configureChains, defaultChains, WagmiConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

window.gmShop = {
  ThemeAppExtension: class ThemeAppExtension {
    private arguments;

    constructor(args: any) {
      this.arguments = args;
    }

    mount() {
      const container = document.getElementById(this.arguments.containerId);
      if (!container) return;

      const {chains, provider, webSocketProvider} = configureChains(
        defaultChains,
        [publicProvider()],
      );

      const client = createClient({
        autoConnect: true,
        connectors: [
          new MetaMaskConnector({chains}),
          new WalletConnectConnector({chains, options: {qrcode: false}}),
        ],
        provider,
        webSocketProvider,
      });

      const root = ReactDOM.createRoot(container as HTMLElement);
      root.render(
        <React.StrictMode>
          <WagmiConfig client={client}>
            <WalletConnectionProvider>
              <App serverArguments={this.arguments} />
            </WalletConnectionProvider>
          </WagmiConfig>
        </React.StrictMode>,
      );
    }
  },
};
