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

  const standardConnector = buildWalletConnectConnector({
    chains,
    mobileLinks: supportedWalletConnectWallets,
    qrcode: mobilePlatform !== undefined,
  });

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
