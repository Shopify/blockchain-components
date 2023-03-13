import {getBrowserInfo} from '@shopify/blockchain-components';
import {Rainbow as rainbowIcon} from 'shared';

import {ConnectorInstance, ConnectorProps} from '../types/connector';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const Rainbow = ({chains}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains});

      return connector;
    },
    marketingSite: 'https://rainbow.me/',
    mobileAppPrefixes: {
      Android: '',
      iOS: 'https://rnbwapp.com/wc?uri=',
    },
    icon: rainbowIcon,
    id: 'rainbow',
    name: 'Rainbow',
    qrCodeSupported: !mobilePlatform,
  };
};
