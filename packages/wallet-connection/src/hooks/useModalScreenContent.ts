import {useI18n} from '@shopify/react-i18n';

import {ConnectionState} from '../types/connectionState';
import {getBrowserInfo} from '../utils/getBrowser';

export const useModalScreenContent = (
  state: ConnectionState,
): {body: string; title: string} => {
  const [i18n] = useI18n();
  const {mobilePlatform} = getBrowserInfo();
  const connectingScreenPlatform = mobilePlatform
    ? i18n.translate('hooks.modalScreenContent.connecting.mobileApp')
    : i18n.translate('hooks.modalScreenContent.connecting.browserExtension');

  const screenContent: {
    [key in keyof typeof ConnectionState]: {body: string; title: string};
  } = {
    AlreadyConnected: {
      body: i18n.translate('hooks.modalScreenContent.alreadyConnected.body'),
      title: i18n.translate('hooks.modalScreenContent.alreadyConnected.title'),
    },
    Connected: {
      body: i18n.translate('hooks.modalScreenContent.connected.body'),
      title: i18n.translate('hooks.modalScreenContent.connected.title'),
    },
    Connecting: {
      body: i18n.translate('hooks.modalScreenContent.connecting.body'),
      title: i18n.translate('hooks.modalScreenContent.connecting.title', {
        platform: connectingScreenPlatform,
      }),
    },
    Failed: {
      body: i18n.translate('hooks.modalScreenContent.failed.body'),
      title: i18n.translate('hooks.modalScreenContent.failed.title'),
    },
    Rejected: {
      body: i18n.translate('hooks.modalScreenContent.rejected.body'),
      title: i18n.translate('hooks.modalScreenContent.rejected.title'),
    },
    Unavailable: {
      body: i18n.translate('hooks.modalScreenContent.unavailable.body'),
      title: i18n.translate('hooks.modalScreenContent.unavailable.title'),
    },
  };

  return screenContent[state];
};
