import {getBrowserInfo} from '@shopify/blockchain-components';
import {WalletConnect as walletConnectIcon} from 'shared';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const WalletConnect = ({chains}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  const supportedWalletConnectWallets = [
    'Rainbow',
    'Ledger',
    'Trezor',
    'Trust Wallet',
    'Argent',
    'Safe',
  ];

  const standardConnector = buildWalletConnectConnector({
    chains,
    mobileLinks: supportedWalletConnectWallets,
    /**
     * This prop disables/enables the WalletConnect modal usage.
     * On desktop, we support connecting via WC via either scan
     * or by using the WC modal. On mobile we only support
     * connecting via the WC modal.
     */
    qrcode: Boolean(mobilePlatform),
  });

  /**
   * On mobile we need only a single connector, that's because
   * on mobile the user cannot get to the scan screen. This means
   * that users cannot select to open the modal connector.
   */
  const modalConnector = mobilePlatform
    ? undefined
    : buildWalletConnectConnector({
        chains,
        mobileLinks: supportedWalletConnectWallets,
        qrcode: true,
      });

  return {
    createConnector: () => standardConnector,
    icon: walletConnectIcon,
    id: 'walletConnect',
    modalConnector,
    name: 'WalletConnect',
    qrCodeSupported: true,
  };
};
