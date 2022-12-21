import {WalletConnect as walletConnectIcon} from 'shared';

import {ConnectorInstance, ConnectorProps} from '../types/connector';
import {getBrowserInfo} from '../utils/getBrowser';

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

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({
        chains,
        mobileLinks: supportedWalletConnectWallets,
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
