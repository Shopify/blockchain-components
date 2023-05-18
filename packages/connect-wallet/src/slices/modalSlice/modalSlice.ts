import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {ConnectionState} from '~/types/connectionState';
import type {ModalRoute} from '~/types/modal';

interface SerializedErrorContent {
  message?: string;
  name?: string;
}

export interface ModalSliceType {
  connectionStatus: ConnectionState;
  error?: SerializedErrorContent | undefined;
  history: ModalRoute[];
  open: boolean;
  route: ModalRoute;
  signing: boolean;
}

export const initialState: ModalSliceType = {
  connectionStatus: 'Connecting',
  error: undefined,
  history: [],
  open: false,
  route: 'Connect',
  signing: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: () => {
      return initialState;
    },
    goBack: (state) => {
      // Reset the signature state if the current route is the Signing route.
      if (state.route === 'Signature') {
        return {
          ...initialState,
          open: true,
        };
      }

      if (state.history.length) {
        const newHistory = state.history.slice(0, state.history.length - 1);

        /**
         * If the new history contains more than one entry, we can
         * use the last entry in the history array as our new screen.
         * Otherwise, we go back to the first screen,
         */
        const newScreen: ModalRoute = newHistory.length
          ? newHistory[newHistory.length - 1]
          : 'Connect';

        state.history = newHistory;
        state.route = newScreen;
      } else {
        // Ensure that the history stays empty
        state.history = [];
        // Send the user back to the first modal route.
        state.route = 'Connect';
      }
    },
    navigate: (state, action: PayloadAction<ModalRoute>) => {
      state.history = [...state.history, action.payload];
      state.route = action.payload;
    },
    openModal: (state) => {
      state.open = true;
    },
    setConnectionStatus: (state, action: PayloadAction<ConnectionState>) => {
      state.connectionStatus = action.payload;
    },
    setError: (
      state,
      action: PayloadAction<SerializedErrorContent | undefined>,
    ) => {
      state.error = action.payload;
    },
    setSigning: (state, action: PayloadAction<boolean>) => {
      state.signing = action.payload;
    },
  },
});

export const {
  closeModal,
  goBack,
  navigate,
  openModal,
  setConnectionStatus,
  setError,
  setSigning,
} = modalSlice.actions;
