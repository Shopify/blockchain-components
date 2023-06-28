import {Rainbow as rainbowIcon} from 'shared';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';
import {getBrowserInfo} from '~/utils/getBrowser';

export const Rainbow = ({
  chains,
  projectId,
}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains, projectId});

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
