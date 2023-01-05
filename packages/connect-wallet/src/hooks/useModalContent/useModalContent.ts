import {useI18n} from '@shopify/react-i18n';

import {ConnectionState} from '../../types/connectionState';
import {useAppSelector} from '../useAppState';

export const useModalScreenContent = (
  state: ConnectionState,
): {body: string; title: string} => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const [i18n] = useI18n();

  const connectorName =
    pendingConnector?.name ||
    i18n.translate('modalContent.connecting.mobileApp');

  const connectingScreenPlatform = pendingConnector?.browserExtensions
    ? i18n.translate('modalContent.connecting.browserExtension')
    : connectorName;

  const screenContent: {
    [key in keyof typeof ConnectionState]: {body: string; title: string};
  } = {
    AlreadyConnected: {
      body: i18n.translate('modalContent.alreadyConnected.body'),
      title: i18n.translate('modalContent.alreadyConnected.title'),
    },
    Connected: {
      body: i18n.translate('modalContent.connected.body'),
      title: i18n.translate('modalContent.connected.title'),
    },
    Connecting: {
      body: i18n.translate('modalContent.connecting.body'),
      title: i18n.translate('modalContent.connecting.title', {
        platform: connectingScreenPlatform,
      }),
    },
    Failed: {
      body: i18n.translate('modalContent.failed.body'),
      title: i18n.translate('modalContent.failed.title'),
    },
    Rejected: {
      body: i18n.translate('modalContent.rejected.body'),
      title: i18n.translate('modalContent.rejected.title'),
    },
    Unavailable: {
      body: i18n.translate('modalContent.unavailable.body'),
      title: i18n.translate('modalContent.unavailable.title'),
    },
  };

  return screenContent[state];
};
