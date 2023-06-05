import {ConnectWalletProvider} from '@shopify/connect-wallet';
import '@shopify/connect-wallet/styles.css';
import '@shopify/tokengate/styles.css';
import type {AppProps} from 'next/app';
import {WagmiConfig} from 'wagmi';

import '../styles/globals.css';

import {chains, config, connectors} from '../connect-wallet-config';

export default function App({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectWalletProvider chains={chains} connectors={connectors}>
        <Component {...pageProps} />
      </ConnectWalletProvider>
    </WagmiConfig>
  );
}
