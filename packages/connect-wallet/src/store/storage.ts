/**
 * This file is mostly a copy of the storage functionality from redux-persist
 * as the package itself uses directory imports which is not supported for
 * all package consumers.
 */
import {Storage} from 'redux-persist';

const STORAGE_TYPE = 'localStorage';

const noop = () => {};
const noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop,
};

const createStorage = (): Storage => {
  const storage: Storage = getStorage();

  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve) => {
        resolve(storage.getItem(key));
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve) => {
        resolve(storage.setItem(key, item));
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve) => {
        resolve(storage.removeItem(key));
      });
    },
  };
};

const getStorage = (): Storage => {
  if (hasStorage()) {
    return self[STORAGE_TYPE];
  }

  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `redux-persist failed to create sync storage. falling back to noop storage.`,
    );
  }

  return noopStorage;
};

function hasStorage() {
  if (typeof self !== 'object' || !('localStorage' in self)) {
    return false;
  }

  try {
    const storage = self[STORAGE_TYPE];
    const testKey = `redux-persist ${STORAGE_TYPE} test`;
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (exception) {
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV !== 'production')
      console.warn(
        `redux-persist ${STORAGE_TYPE} test failed, persistence will be disabled.`,
      );

    return false;
  }

  return true;
}

export default createStorage();
