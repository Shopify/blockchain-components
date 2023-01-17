import {Chain} from '@wagmi/core';
import {Connector as WagmiConnector} from 'wagmi';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

import {Browser} from './browser';

export interface ConnectArgs {
  /** Chain ID to connect to */
  chainId?: number;
  /** Connector to connect */
  connector: WagmiConnector;
}

export interface ConnectorProps {
  appName?: string;
  chains: Chain[];
}

export interface ConnectorInstance {
  createConnector: () => WagmiConnector;
  /**
   * A list of browser extension URLs for supported browsers.
   *
   * Particularly helpful for when users do not have a wallet app extension,
   * because we can then open the link to download the extension.
   */
  browserExtensions?: {[T in Browser]?: string};
  /**
   * For wallet connectors that have native macOS or Windows
   * applications. This is particularly useful for wallets such as Ledger.
   */
  desktopAppLink?: string;
  /**
   * The wallet app's icon to render.
   */
  icon: JSX.Element | null;
  /**
   * The id of the wallet. This is not the same as the connector.id from
   * wagmi, because wagmi doesn't support wallets like Rainbow, Trezor, etc.
   * out of the box. Those wallets are identified under WalletConnect.
   */
  id: string;
  /**
   * Marketing site for Get a wallet screen on desktop
   */
  marketingSite?: string;
  /**
   * Mobile applications for both mobile OS providers.
   */
  mobileApps?: {
    Android?: string;
    iOS?: string;
  };
  /**
   * Prefixes used for opening a WalletConnect deeplink
   * on Android and iOS devices.
   */
  mobileAppPrefixes?: {
    Android?: string;
    iOS?: string;
  };
  /**
   * Experimental: if creating a connector that uses WalletConnect
   * you may want to implement a modalConnector for when users
   * are unable to scan the QR Code and want to use the
   * WalletConnect modal instead.
   */
  modalConnector?: WalletConnectConnector;
  /**
   * The assigned name of the connector.
   */
  name: string;
  /**
   * Whether or not connecting with a QR code is supported.
   */
  qrCodeSupported: boolean;
}

export type Connector = Omit<ConnectorInstance, 'createConnector'> & {
  connector: WagmiConnector;
  /**
   * Whether the connector is ready to be used or not.
   */
  ready?: boolean;
};

export type SerializedConnector = Omit<
  Connector,
  'connector' | 'icon' | 'modalConnector' | 'ready'
>;
