import {MetaMask as metaMaskIcon} from 'shared';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';
import {isInstalled} from '~/utils/isInstalled';

export const MetaMask = ({chains}: ConnectorProps): ConnectorInstance => {
  const mmInstalled = isInstalled('MetaMask');

  return {
    createConnector: () => {
      const connector = mmInstalled
        ? new MetaMaskConnector({chains})
        : buildWalletConnectConnector({chains});

      return connector;
    },
    marketingSite: 'https://metamask.io/',
    mobileAppPrefixes: {
      Android: '',
      iOS: 'https://metamask.app.link/wc?uri=',
    },
    icon: metaMaskIcon,
    id: 'metaMask',
    name: 'MetaMask',
    qrCodeSupported: !mmInstalled,
  };
};
