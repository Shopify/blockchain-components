import {createContext} from 'react';

import {ConnectionState} from '../../types/connectionState';
import {ConnectArgs} from '../../types/connector';
import {SignatureResponse, Wallet} from '../../types/wallet';
import {ConnectWalletError} from '../../utils/error';

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
  requestSignature: (wallet: Wallet) => Promise<SignatureResponse | undefined>;
  signing?: boolean;
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
  requestSignature: () =>
    Promise.reject(
      new ConnectWalletError('Invalid attempt to request signature.'),
    ),
  signing: false,
};

export const ModalContext = createContext<ModalProviderValue>(defaultState);
