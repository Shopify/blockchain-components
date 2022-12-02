import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

export const getScreenContent = (
  state: ConnectionState,
): {body: string; title: string} => {
  const {mobilePlatform} = getBrowserInfo();

  const screenContent: {
    [key in keyof typeof ConnectionState]: {body: string; title: string};
  } = {
    AlreadyConnected: {
      body: 'This connector is already connected',
      title: 'Error',
    },
    Connected: {
      body: 'Connected successfully',
      title: 'Success!',
    },
    Connecting: {
      body: `Confirm in ${
        mobilePlatform ? 'the mobile app.' : 'browser extension.'
      }`,
      title: 'Requesting connection',
    },
    Failed: {
      body: 'Failed to connect.',
      title: 'Error',
    },
    Rejected: {
      body: 'User rejected the request.',
      title: 'Rejected',
    },
    Unavailable: {
      body: 'Unable to access connector.',
      title: 'Unavailable',
    },
  };

  return screenContent[state];
};
