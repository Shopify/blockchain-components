import type {AppState} from './combineReducers';

import {initialState as initialModalState} from '~/slices/modalSlice';
import {initialState as initialWalletState} from '~/slices/walletSlice';
import {ConnectWalletError} from '~/utils/error';

const INITIAL_STATE: AppState = {
  modal: initialModalState,
  wallet: initialWalletState,
};

interface PersistenceConfigurationOptions {
  ignoreList: string[];
  key: string;
}

interface SaveStateProps {
  configuration: PersistenceConfigurationOptions;
  state: Record<string, any>;
}

export function saveState({configuration, state}: SaveStateProps) {
  const {ignoreList, key} = configuration;

  // Add a comment about not being able to delete non-configurable properties
  // in the state.
  const copiedState = {...state};

  /**
   * For each key in our ignoreList, remove that value
   * from the state value, delete that value from the
   * state object.
   */
  ignoreList.forEach((key) => delete copiedState[key]);

  try {
    const serializedState = JSON.stringify(copiedState);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV === 'development') {
      console.error(
        new ConnectWalletError(
          'Failed to write to local storage for provided key',
        ),
      );
    }
  }
}

export function loadState(): AppState {
  try {
    if (hasStorage()) {
      // We only care about loading stored wallet state.
      const walletState = localStorage.getItem('wallet');

      if (walletState === null) {
        // Fall back to initial state.
        return INITIAL_STATE;
      }

      return {
        modal: initialModalState,
        wallet: JSON.parse(walletState),
      };
    }

    return INITIAL_STATE;
  } catch (err) {
    return INITIAL_STATE;
  }
}

function hasStorage() {
  if (typeof self !== 'object' || !('localStorage' in self)) {
    return false;
  }

  try {
    const testKey = `localStorage test`;

    localStorage.setItem(testKey, 'test');
    localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
  } catch (exception) {
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV !== 'production')
      console.warn(`localStorage test failed, persistence will be disabled.`);

    return false;
  }

  return true;
}
