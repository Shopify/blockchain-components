import {WalletConnect as walletConnectIcon} from 'shared/assets/connectors';

import {ConnectorInstance, ConnectorProps} from '../types/connector';
import {getBrowserInfo} from '../utils/getBrowser';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const WalletConnect = ({chains}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({
        chains,
        qrcode: mobilePlatform !== undefined,
      });

      return connector;
    },
    icon: walletConnectIcon,
    id: 'walletConnect',
    name: 'WalletConnect',
    qrCodeSupported: true,
  };
};
