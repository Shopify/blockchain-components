import {ConnectionState} from '../../types/connectionState';

import {
  goBack,
  initialState,
  modalSlice,
  navigate,
  openModal,
  setConnectionStatus,
  setError,
} from './modalSlice';
import type {ModalSliceType} from './modalSlice';

const {closeModal} = modalSlice.actions;

const {reducer} = modalSlice;

const CONNECTION_STATUS_COLLECTION: ConnectionState[] = [
  'AlreadyConnected',
  'Connected',
  'Connecting',
  'Failed',
  'Rejected',
  'Unavailable',
];

const ERROR_STATE: ModalSliceType = {
  ...initialState,
  error: {
    message: 'Test error message',
  },
};

const SIGNATURE_STATE: ModalSliceType = {
  ...initialState,
  connectionStatus: 'Connected',
  history: ['Connecting', 'Signature'],
  route: 'Signature',
};

describe('modalSlice', () => {
  describe('closeModal', () => {
    it('Resets the state to the initial state', () => {
      expect(reducer(SIGNATURE_STATE, closeModal())).toStrictEqual(
        initialState,
      );
    });
  });

  describe('goBack', () => {
    it('Resets the state to the initial state if the current route is "Signature"', () => {
      // The modal should still be open via {open: true}
      expect(reducer(SIGNATURE_STATE, goBack())).toStrictEqual({
        ...initialState,
        open: true,
      });
    });

    it('Goes back to the "Connect" route when the history is only 1 route deep', () => {
      const existingState: ModalSliceType = {
        ...initialState,
        history: ['Connecting'],
        route: 'Connecting',
      };

      expect(reducer(existingState, goBack())).toStrictEqual({
        ...initialState,
        history: [],
        route: 'Connect',
      });
    });

    it('Goes back one route when the history is more than 1 route deep', () => {
      const existingState: ModalSliceType = {
        ...initialState,
        history: ['WhatAreWallets', 'GetAWallet'],
        route: 'GetAWallet',
      };

      expect(reducer(existingState, goBack())).toStrictEqual({
        ...initialState,
        history: ['WhatAreWallets'],
        route: 'WhatAreWallets',
      });
    });
  });

  it('navigate updates the history and route when dispatched', () => {
    expect(reducer(initialState, navigate('WhatAreWallets'))).toStrictEqual({
      ...initialState,
      history: ['WhatAreWallets'],
      route: 'WhatAreWallets',
    });
  });

  it('openModal sets open to true', () => {
    expect(reducer(initialState, openModal())).toStrictEqual({
      ...initialState,
      open: true,
    });
  });

  it('setConnectionStatus updates connectionStatus to the provided value', () => {
    CONNECTION_STATUS_COLLECTION.forEach((status) => {
      expect(reducer(initialState, setConnectionStatus(status))).toStrictEqual({
        ...initialState,
        connectionStatus: status,
      });
    });
  });

  describe('setError', () => {
    it('sets the error to undefined when dispatched with no parameter', () => {
      expect(reducer(ERROR_STATE, setError())).toStrictEqual(initialState);
    });

    it('sets the error to an object when dispatched with only error.name', () => {
      expect(
        reducer(initialState, setError({name: 'UserRejectedRequestError'})),
      ).toStrictEqual({
        ...initialState,
        error: {name: 'UserRejectedRequestError'},
      });
    });

    it('sets the error to an object when dispatched with only error.message', () => {
      expect(
        reducer(initialState, setError({message: 'User rejected request'})),
      ).toStrictEqual({
        ...initialState,
        error: {message: 'User rejected request'},
      });
    });
  });
});
