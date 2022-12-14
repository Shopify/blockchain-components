import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface WalletSliceType {
  message?: string;
  _persist: any;
}

export const initialState: WalletSliceType = {
  message: undefined,
  _persist: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
    },
  },
});

export const {setMessage} = walletSlice.actions;
