import {WalletConnect as walletConnectIcon} from 'shared';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';
import {getBrowserInfo} from '~/utils/getBrowser';

export const WalletConnect = ({
  chains,
  projectId,
}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  const standardConnector = buildWalletConnectConnector({
    chains,
    /**
     * This prop disables/enables the WalletConnect modal usage.
     * On desktop, we support connecting via WC via either scan
     * or by using the WC modal. On mobile we only support
     * connecting via the WC modal.
     */
    projectId,
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
        projectId,
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
