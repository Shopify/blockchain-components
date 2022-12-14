import {createSlice} from '@reduxjs/toolkit';

export interface WalletSliceType {
  _persist: any;
}

export const initialState: WalletSliceType = {
  _persist: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
});
