import {Chain} from '@wagmi/core';
import {createContext} from 'react';

import {Connector} from '../../types/connector';
import {OrderAttributionMode} from '../../types/orderAttribution';

import {StatementGenerator} from './types';

export interface ConnectWalletProviderValue {
  allowDelegateCashSupport?: boolean;
  chains: Chain[];
  connectors: Connector[];
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
  orderAttributionMode: OrderAttributionMode;
}

const defaultContextValue: ConnectWalletProviderValue = {
  allowDelegateCashSupport: true,
  chains: [],
  connectors: [],
  requireSignature: true,
  orderAttributionMode: 'required',
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
