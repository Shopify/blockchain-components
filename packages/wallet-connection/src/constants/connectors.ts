import {MetaMask, WalletConnect} from 'shared/assets/connectors';

export interface ConnectorData {
  /**
   * A list of browser extension URLs for supported browsers.
   *
   * Particularly helpful for when users do not have a wallet app extension,
   * because we can then open the link to download the extension.
   */
  browserExtensions?: Record<string, string>;
  /**
   * The wallet app's icon to render.
   */
  icon: JSX.Element | null;
  /**
   * Whether or not connecting with a QR code is supported.
   */
  qrCodeSupported: boolean;
}

export const Connectors: Record<string, ConnectorData> = {
  MetaMask: {
    icon: MetaMask,
    qrCodeSupported: false,
  },
  WalletConnect: {
    icon: WalletConnect,
    qrCodeSupported: true,
  },
};

const SUPPORTED_CONNECTORS = Object.keys(Connectors);
const DEFAULT_CONNECTOR: ConnectorData = {
  icon: null,
  qrCodeSupported: false,
};

export const getConnectorData = (connectorName?: string): ConnectorData => {
  if (!connectorName) {
    return DEFAULT_CONNECTOR;
  }

  // Make sure that the name provided matches a valid key in our supported connectors list.
  const supported = SUPPORTED_CONNECTORS.includes(connectorName);

  if (!supported) {
    return DEFAULT_CONNECTOR;
  }

  return Connectors[connectorName];
};
