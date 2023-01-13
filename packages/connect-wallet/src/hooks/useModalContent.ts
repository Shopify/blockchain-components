import {ConnectionState} from '../types/connectionState';

import {useAppSelector} from './useAppState';
import {useTranslation} from './useTranslation';

export const useModalScreenContent = (
  state: ConnectionState,
): {body: string; title: string} => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {t} = useTranslation('UseModalContent');

  const connectorName = pendingConnector?.name || t('the mobile app');

  const connectingScreenPlatform = pendingConnector?.browserExtensions
    ? t('browser extension')
    : connectorName;

  const screenContent: {
    [key in keyof typeof ConnectionState]: {body: string; title: string};
  } = {
    AlreadyConnected: {
      body: t('alreadyConnected.body'),
      title: t('alreadyConnected.title'),
    },
    Connected: {
      body: t('connected.body'),
      title: t('connected.title'),
    },
    Connecting: {
      body: t('connecting.body'),
      title: t('connecting.title', {
        platform: connectingScreenPlatform,
      }),
    },
    Failed: {
      body: t('failed.body'),
      title: t('failed.title'),
    },
    Rejected: {
      body: t('rejected.body'),
      title: t('rejected.title'),
    },
    Unavailable: {
      body: t('unavailable.body'),
      title: t('unavailable.title'),
    },
  };

  return screenContent[state];
};