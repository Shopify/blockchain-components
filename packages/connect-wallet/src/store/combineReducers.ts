import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {walletSlice, WalletSliceType} from '../slices/walletSlice';

export interface AppState {
  wallet: WalletSliceType;
}

const walletPersist = {
  key: 'wallet',
  storage,
};

export const rootReducer = combineReducers<AppState>({
  wallet: persistReducer(walletPersist, walletSlice.reducer),
});

export type RootState = ReturnType<typeof rootReducer>;
