import {ConnectWalletProvider} from '@shopify/connect-wallet';
import type {AppProps} from 'next/app';
import {WagmiConfig} from 'wagmi';

import '../styles/globals.css';

import {chains, client} from '../connect-wallet-config';

export default function App({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectWalletProvider chains={chains}>
        <Component {...pageProps} />
      </ConnectWalletProvider>
    </WagmiConfig>
  );
}
