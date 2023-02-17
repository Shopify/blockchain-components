import {Chain} from '@wagmi/core';
import {createContext} from 'react';

import {OrderAttributionMode} from '../../types/orderAttribution';
import {StatementGenerator} from '../../types/provider';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  projectId: string;
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
  orderAttributionMode: OrderAttributionMode;
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
  projectId: '',
  requireSignature: true,
  orderAttributionMode: 'required',
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
