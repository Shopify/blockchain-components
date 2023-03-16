import {ConnectWalletProvider} from '@shopify/connect-wallet';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {WagmiConfig} from 'wagmi';

import App from './App';
import './index.css';
import '@shopify/connect-wallet/styles.css';
import {chains, client} from './connect-wallet-config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectWalletProvider chains={chains} connectors={[]}>
        <App />
      </ConnectWalletProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
