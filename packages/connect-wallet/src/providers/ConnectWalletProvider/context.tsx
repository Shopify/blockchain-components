import {Chain} from '@wagmi/core';
import {createContext} from 'react';

import {OrderAttributionMode} from '../../types/orderAttribution';
import {StatementGenerator} from '../../types/provider';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  disableDelegates?: boolean;
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
  orderAttributionMode: OrderAttributionMode;
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
  disableDelegates: false,
  requireSignature: true,
  orderAttributionMode: 'required',
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
