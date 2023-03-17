import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import {modalSlice} from '../slices/modalSlice';
import type {ModalSliceType} from '../slices/modalSlice';
import {walletSlice} from '../slices/walletSlice';
import type {WalletSliceType} from '../slices/walletSlice';

import storage from './storage';

export interface AppState {
  modal: ModalSliceType;
  wallet: WalletSliceType;
}

const walletPersist = {
  key: 'wallet',
  blacklist: ['activeWallet', 'message', 'pendingConnector', 'pendingWallet'],
  storage,
};

export const rootReducer = combineReducers<AppState>({
  modal: modalSlice.reducer,
  wallet: persistReducer(walletPersist, walletSlice.reducer),
});
