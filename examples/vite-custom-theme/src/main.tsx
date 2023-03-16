import {ConnectWalletProvider} from '@shopify/connect-wallet';
import '@shopify/connect-wallet/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {WagmiConfig} from 'wagmi';

import App from './App';
import './index.css';
// Import our custom components stylesheet
import './components-theme.css';
import {chains, client, connectors} from './connect-wallet-config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectWalletProvider chains={chains} connectors={connectors}>
        <App />
      </ConnectWalletProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
