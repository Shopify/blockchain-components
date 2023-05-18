import {combineReducers} from '@reduxjs/toolkit';

import {modalSlice} from '~/slices/modalSlice';
import type {ModalSliceType} from '~/slices/modalSlice';
import {walletSlice} from '~/slices/walletSlice';
import type {WalletSliceType} from '~/slices/walletSlice';

export interface AppState {
  modal: ModalSliceType;
  wallet: WalletSliceType;
}

export const rootReducer = combineReducers<AppState>({
  modal: modalSlice.reducer,
  wallet: walletSlice.reducer,
});
