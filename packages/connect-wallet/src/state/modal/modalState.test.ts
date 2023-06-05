import {act, renderHook} from '@testing-library/react';

import {initialModalState} from './modalState';

import {ModalStateDefintion} from '~/state/types';
import {useTestStore} from '~/test/store';
import {ConnectionState} from '~/types/connectionState';

const CONNECTION_STATUS_COLLECTION: ConnectionState[] = [
  'AlreadyConnected',
  'Connected',
  'Connecting',
  'Failed',
  'Rejected',
  'Unavailable',
];

const ERROR_STATE: Partial<ModalStateDefintion> = {
  error: {
    message: 'Test error message',
  },
};

const SIGNATURE_STATE: Partial<ModalStateDefintion> = {
  connectionStatus: 'Connected',
  history: ['Connecting', 'Signature'],
  route: 'Signature',
};

describe('modalSlice', () => {
  const {result} = renderHook(() => useTestStore((state) => state.modal));
  const {
    closeModal,
    goBack,
    navigate,
    openModal,
    reset,
    setConnectionStatus,
    setError,
  } = result.current;

  afterEach(() => {
    vi.clearAllMocks();
    const state = useTestStore.getState();

    // Replace state after each test.
    useTestStore.setState(state, true);
  });

  const getState = () => {
    const state = useTestStore.getState().modal;

    return state;
  };

  const setState = (props?: Partial<ModalStateDefintion>) => {
    const state = useTestStore.getState();

    act(() =>
      useTestStore.setState(
        {
          ...state,
          modal: {
            ...state.modal,
            ...props,
          },
        },
        true,
      ),
    );
  };

  describe('closeModal', () => {
    it('Sets open to false', () => {
      setState({open: true});

      act(() => closeModal());

      expect(getState().open).toStrictEqual(false);
    });
  });

  describe('goBack', () => {
    it('Resets the state to the initial state if the current route is "Signature"', () => {
      setState({...SIGNATURE_STATE});

      act(() => goBack());

      const {connectionStatus, history, route} = getState();

      expect(connectionStatus).toStrictEqual('Connecting');
      expect(history).toStrictEqual([]);
      expect(route).toStrictEqual('Connect');
    });

    it('Goes back to the "Connect" route when the history is only 1 route deep', () => {
      setState({
        history: ['Connecting'],
        route: 'Connecting',
      });

      goBack();

      const {history, route} = getState();

      expect(history).toStrictEqual([]);
      expect(route).toStrictEqual('Connect');
    });

    it('Goes back one route when the history is more than 1 route deep', () => {
      setState({
        history: ['WhatAreWallets', 'GetAWallet'],
        route: 'GetAWallet',
      });

      goBack();

      const {history, route} = getState();

      expect(history).toStrictEqual(['WhatAreWallets']);
      expect(route).toStrictEqual('WhatAreWallets');
    });
  });

  it('navigate updates the history and route when dispatched', () => {
    setState({history: [], route: 'Connect'});
    const {history, route} = getState();
    expect(history).toStrictEqual([]);
    expect(route).toStrictEqual('Connect');

    navigate('WhatAreWallets');

    const {history: updatedHistory, route: updatedRoute} = getState();

    expect(updatedHistory).toStrictEqual(['WhatAreWallets']);
    expect(updatedRoute).toStrictEqual('WhatAreWallets');
  });

  it('openModal sets open to true', () => {
    setState({open: false});
    openModal();
    expect(getState().open).toStrictEqual(true);
  });

  it('reset resets the state to the initial state', () => {
    setState({...SIGNATURE_STATE});

    const state = getState();
    expect(state).toStrictEqual(expect.objectContaining(SIGNATURE_STATE));

    act(() => reset());

    const updatedState = getState();
    expect(updatedState).toStrictEqual(
      expect.objectContaining(initialModalState),
    );
  });

  it('setConnectionStatus updates connectionStatus to the provided value', () => {
    CONNECTION_STATUS_COLLECTION.forEach((status) => {
      setConnectionStatus(status);
      expect(getState().connectionStatus).toStrictEqual(status);
    });
  });

  describe('setError', () => {
    it('sets the error to undefined when dispatched with no parameter', () => {
      setState({...ERROR_STATE});
      setError();
      expect(getState().error).toStrictEqual(undefined);
    });

    it('sets the error to an object when dispatched with only error.name', () => {
      setError({name: 'UserRejectedRequestError'});
      expect(getState().error).toStrictEqual({
        name: 'UserRejectedRequestError',
      });
    });

    it('sets the error to an object when dispatched with only error.message', () => {
      setError({message: 'User rejected request'});
      expect(getState().error).toStrictEqual({
        message: 'User rejected request',
      });
    });
  });
});
