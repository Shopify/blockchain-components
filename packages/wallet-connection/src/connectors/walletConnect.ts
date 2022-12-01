import {WalletConnect as walletConnectIcon} from 'shared/assets/connectors';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const WalletConnect = ({chains}: ConnectorProps): ConnectorInstance => {
  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains});

      return connector;
    },
    icon: walletConnectIcon,
    id: 'walletConnect',
    name: 'WalletConnect',
    qrCodeSupported: true,
  };
};
