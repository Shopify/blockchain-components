import {ImToken as imTokenIcon} from 'shared';

import {buildWalletConnectConnector} from './buildWalletConnectConnector';

import {ConnectorInstance, ConnectorProps} from '~/types/connector';
import {getBrowserInfo} from '~/utils/getBrowser';

export const ImToken = ({chains}: ConnectorProps): ConnectorInstance => {
  const {mobilePlatform} = getBrowserInfo();

  return {
    createConnector: () => {
      const connector = buildWalletConnectConnector({chains});

      return connector;
    },
    marketingSite: 'https://token.im/',
    mobileAppPrefixes: {
      Android: 'imtokenv2://wc?uri=',
      iOS: 'imtokenv2://wc?uri=',
    },
    icon: imTokenIcon,
    id: 'imToken',
    name: 'imToken',
    qrCodeSupported: !mobilePlatform,
  };
};
