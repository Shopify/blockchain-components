import {ConnectWalletProvider} from '@shopify/connect-wallet';
import '@shopify/connect-wallet/styles.css';
import '@shopify/tokengate/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {WagmiConfig} from 'wagmi';

import './index.css';
import App from './App';
import {chains, config, connectors} from './connect-wallet-config';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectWalletProvider chains={chains} connectors={connectors}>
        <App />
      </ConnectWalletProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
