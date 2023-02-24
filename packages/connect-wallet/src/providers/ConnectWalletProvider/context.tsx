import {createContext} from 'react';
import {Chain} from 'wagmi';

import {OrderAttributionMode} from '../../types/orderAttribution';

import {StatementGenerator} from './types';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
  orderAttributionMode: OrderAttributionMode;
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
  requireSignature: true,
  orderAttributionMode: 'required',
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
