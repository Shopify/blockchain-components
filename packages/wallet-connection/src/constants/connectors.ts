import {MetaMask, WalletConnect} from 'shared/assets/connectors';
import {Browser} from '../types/browser';

export interface ConnectorData {
  /**
   * A list of browser extension URLs for supported browsers.
   *
   * Particularly helpful for when users do not have a wallet app extension,
   * because we can then open the link to download the extension.
   */
  browserExtensions?: {[T in Browser]?: string};
  /**
   * The wallet app's icon to render.
   */
  icon: JSX.Element | null;
  /**
   * Mobile applications for both mobile OS providers.
   */
  mobileApps?: {
    Android?: string;
    iOS?: string;
  };
  name: string;
  /**
   * Whether or not connecting with a QR code is supported.
   */
  qrCodeSupported: boolean;
}

export const Connectors: Record<string, ConnectorData> = {
  MetaMask: {
    browserExtensions: {
      Brave:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Chrome:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US',
      Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
      Opera: 'https://addons.opera.com/en-gb/extensions/details/metamask-10/',
    },
    icon: MetaMask,
    mobileApps: {
      Android: 'https://play.google.com/store/apps/details?id=io.metamask',
      iOS: 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202',
    },
    name: 'MetaMask',
    qrCodeSupported: false,
  },
  WalletConnect: {
    icon: WalletConnect,
    name: 'WalletConnect',
    qrCodeSupported: true,
  },
};

const SUPPORTED_CONNECTORS = Object.keys(Connectors);
const DEFAULT_CONNECTOR: ConnectorData = {
  icon: null,
  name: 'Unsupported',
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
