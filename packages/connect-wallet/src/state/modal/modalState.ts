import type {ModalStateDefintion, ModalStateType, StateSlice} from '../types';

import {ModalRoute} from '~/types/modal';

export const initialModalState: ModalStateDefintion = {
  connectionStatus: 'Connecting',
  error: undefined,
  history: [],
  open: false,
  route: 'Connect',
  signing: false,
};

export const createModalState: StateSlice<ModalStateType> = (set) => ({
  ...initialModalState,
  closeModal: () =>
    set(
      (state) => {
        state.modal.open = false;
      },
      false,
      {
        type: 'modal/closeModal',
      },
    ),
  goBack: () =>
    set(
      (state) => {
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
      },
      false,
      {
        type: 'modal/goBack',
      },
    ),
  navigate: (payload) =>
    set(
      (state) => {
        state.modal.history = [...state.modal.history, payload];
        state.modal.route = payload;
      },
      false,
      {
        type: 'modal/navigate',
        payload,
      },
    ),
  openModal: () =>
    set(
      (state) => {
        state.modal.open = true;
      },
      false,
      {
        type: 'modal/openModal',
      },
    ),
  reset: () =>
    set(
      (state) => {
        state.modal = {
          ...state.modal,
          ...initialModalState,
        };
      },
      false,
      {
        type: 'modal/reset',
      },
    ),
  setConnectionStatus: (payload) =>
    set(
      (state) => {
        state.modal.connectionStatus = payload;
      },
      false,
      {
        type: 'modal/setConnectionStatus',
        payload,
      },
    ),
  setError: (payload) =>
    set(
      (state) => {
        state.modal.error = payload;
      },
      false,
      {
        type: 'modal/setError',
        payload,
      },
    ),
  setSigning: (payload) =>
    set(
      (state) => {
        state.modal.signing = payload;
      },
      false,
      {
        type: 'modal/setSigning',
        payload,
      },
    ),
});
