import {createContext} from 'react';
import {Chain} from 'wagmi';

import {StatementGenerator} from './types';

import {Connector} from '~/types/connector';
import {OrderAttributionMode} from '~/types/orderAttribution';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  connectors: Connector[];
  customTitles?: {
    connectScreenHeader?: string;
  };
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
