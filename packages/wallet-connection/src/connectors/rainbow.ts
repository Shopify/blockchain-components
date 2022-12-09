import {Rainbow as rainbowIcon} from 'shared/assets/connectors';

import {ConnectorInstance, ConnectorProps} from '../types/connector';
import {getBrowserInfo} from '../utils/getBrowser';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

export const Rainbow = ({chains}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains});

      return connector;
    },
    mobileApps: {
      Android: 'https://play.google.com/store/apps/details?id=me.rainbow',
      iOS: 'https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021',
    },
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
