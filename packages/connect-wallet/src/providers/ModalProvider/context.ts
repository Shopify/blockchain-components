import {createContext} from 'react';

import {ConnectionState} from '../../types/connectionState';
import {ConnectArgs} from '../../types/connector';
import {SignatureResponse} from '../../types/wallet';

export enum ModalRoute {
  Connect = 'Connect',
  Connecting = 'Connecting',
  GetAWallet = 'GetAWallet',
  Scan = 'Scan',
  Signature = 'Signature',
  WhatAreWallets = 'WhatAreWallets',
}

export interface ModalProviderValue {
  active: boolean;
  clearError: () => void;
  closeModal: () => void;
  connect: (args?: Partial<ConnectArgs> | undefined) => void;
  connectionStatus: ConnectionState;
  error?: Error;
  navigation: {
    goBack?: () => void;
    navigate: (route: ModalRoute) => void;
    route: ModalRoute;
  };
  openModal: () => void;
  requireSignature?: boolean;
  signing?: boolean;
  signMessage: (props?: {message?: string}) => Promise<SignatureResponse>;
}

const defaultState: ModalProviderValue = {
  active: false,
  clearError: () => {},
  closeModal: () => {},
  connect: () => {},
  connectionStatus: ConnectionState.Connecting,
  navigation: {
    navigate: () => {},
    route: ModalRoute.Connect,
  },
  openModal: () => {},
  signing: false,
  // eslint-disable-next-line @typescript-eslint/require-await
  signMessage: async () => undefined,
};

export const ModalContext = createContext<ModalProviderValue>(defaultState);
