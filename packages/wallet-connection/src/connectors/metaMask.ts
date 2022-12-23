import {MetaMask as metaMaskIcon} from 'shared';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';

import {ConnectorInstance, ConnectorProps} from '../types/connector';
import {isInstalled} from '../utils/isInstalled';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const MetaMask = ({chains}: ConnectorProps): ConnectorInstance => {
  const mmInstalled = isInstalled('MetaMask');

  return {
    createConnector: () => {
      const connector = mmInstalled
        ? new MetaMaskConnector({chains})
        : buildWalletConnectConnector({chains});

      return connector;
    },
    browserExtensions: {
      Brave:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Chrome:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US',
      Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
      Opera: 'https://addons.opera.com/en-gb/extensions/details/metamask-10/',
    },
    marketingSite: 'https://metamask.io/',
    mobileApps: {
      Android: 'https://play.google.com/store/apps/details?id=io.metamask',
      iOS: 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202',
    },
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
