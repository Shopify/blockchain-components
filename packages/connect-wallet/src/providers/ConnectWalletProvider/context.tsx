import {Chain} from '@wagmi/core';
import {createContext} from 'react';

export interface ConnectWalletProviderValue {
  chains: Chain[];
}

const defaultContextValue: ConnectWalletProviderValue = {
  chains: [],
};

export const ConnectWalletContext =
  createContext<ConnectWalletProviderValue>(defaultContextValue);
