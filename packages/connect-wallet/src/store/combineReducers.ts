import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import {walletSlice, WalletSliceType} from '../slices/walletSlice';

import storage from './storage';

export interface AppState {
  wallet: WalletSliceType;
}

const walletPersist = {
  key: 'wallet',
  blacklist: ['activeWallet', 'message', 'pendingConnector', 'pendingWallet'],
  storage,
};

export const rootReducer = combineReducers<AppState>({
  wallet: persistReducer(walletPersist, walletSlice.reducer),
});
