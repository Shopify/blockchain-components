import {Chain} from 'wagmi';
import {createContext} from 'react';

import {Connector} from '../../types/connector';
import {OrderAttributionMode} from '../../types/orderAttribution';

import {StatementGenerator} from './types';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  connectors: Connector[];
  enableDelegateCash?: boolean;
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
  orderAttributionMode: OrderAttributionMode;
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
  connectors: [],
  enableDelegateCash: true,
  requireSignature: true,
  orderAttributionMode: 'required',
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
