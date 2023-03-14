import {Chain} from '@wagmi/core';
import {Connector as WagmiConnector} from 'wagmi';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

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
   * Prefixes used for opening a WalletConnect deeplink
   * on Android and iOS devices.
   */
  mobileAppPrefixes?: Record<string, string | undefined>;
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

type ConnectorBase = Omit<ConnectorInstance, 'createConnector'>;

export type Connector = ConnectorBase & {
  connector: WagmiConnector;
  /**
   * Whether the connector is ready to be used or not.
   */
  ready?: boolean;
};

export type CustomConnector = ConnectorBase & {
  connector: InjectedConnector | WalletConnectConnector;
};

export type SerializedConnector = Omit<
  Connector,
  'connector' | 'icon' | 'modalConnector' | 'ready'
>;
