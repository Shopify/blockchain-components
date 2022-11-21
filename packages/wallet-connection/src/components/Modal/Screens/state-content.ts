import {ConnectionState} from '../../../types/connectionState';

export const ModalContent: {
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
    body: 'Confirm in browser extension.',
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
