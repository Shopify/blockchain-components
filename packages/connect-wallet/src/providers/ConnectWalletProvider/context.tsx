import {Chain} from '@wagmi/core';
import {createContext} from 'react';

import {StatementGenerator} from '../../types/provider';

export interface ConnectWalletProviderValue {
  chains: Chain[];
  requireSignature?: boolean;
  statementGenerator?: StatementGenerator;
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
  requireSignature: true,
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
