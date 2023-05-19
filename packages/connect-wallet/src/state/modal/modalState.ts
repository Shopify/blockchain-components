import type {ModalStateDefintion, ModalStateType, StateSlice} from '../types';

import {ModalRoute} from '~/types/modal';

const initialModalState: ModalStateDefintion = {
  connectionStatus: 'Connecting',
  error: undefined,
  history: [],
  open: false,
  route: 'Connect',
  signing: false,
};

export const createModalState: StateSlice<ModalStateType> = (set) => ({
  ...initialModalState,
  closeModal: () => set((state) => (state.modal.open = false)),
  goBack: () =>
    set((state) => {
      const {history, route: currentRoute} = state.modal;

      if (currentRoute === 'Signature') {
        state.modal = {
          // This is needed to keep the actions in state.
          ...state.modal,
          // Reset the state.
          ...initialModalState,
          open: true,
        };

        return;
      }

      if (history.length) {
        const newHistory = history.slice(0, history.length - 1);

        /**
         * If the new history contains more than one entry, we can
         * use the last entry in the history array as our new screen.
         * Otherwise, we go back to the first screen,
         */
        const newScreen: ModalRoute = newHistory.length
          ? newHistory[newHistory.length - 1]
          : 'Connect';

        state.modal.history = newHistory;
        state.modal.route = newScreen;

        return;
      }

      state.modal.history = [];
      state.modal.route = 'Connect';
    }),
  navigate: (route) =>
    set((state) => {
      state.modal.history = [...state.modal.history, route];
      state.modal.route = route;
    }),
  openModal: () =>
    set((state) => {
      state.modal.open = true;
    }),
  setConnectionStatus: (connectionStatus) =>
    set((state) => {
      state.modal.connectionStatus = connectionStatus;
    }),
  setError: (error) =>
    set((state) => {
      state.modal.error = error;
    }),
  setSigning: (signing) =>
    set((state) => {
      state.modal.signing = signing;
    }),
});
