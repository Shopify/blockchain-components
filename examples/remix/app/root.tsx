import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import {ConnectWalletProvider} from '@shopify/connect-wallet';
import connectWalletStylesheet from '@shopify/connect-wallet/styles.css';
import tokengateStylesheet from '@shopify/tokengate/styles.css';
import {WagmiConfig} from 'wagmi';

import {chains, config, connectors} from '~/connect-wallet-config';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: connectWalletStylesheet,
  },
  {
    rel: 'stylesheet',
    href: tokengateStylesheet,
  },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <WagmiConfig config={config}>
          <ConnectWalletProvider chains={chains} connectors={connectors}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </ConnectWalletProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
