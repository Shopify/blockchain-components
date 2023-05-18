import {configureStore} from '@reduxjs/toolkit';

import {rootReducer} from './combineReducers';
import {listenerMiddleware} from './listenerMiddleware';
import {loadState, saveState} from './persistence';

import logger from '~/middleware/loggerMiddleware';

const walletPersistConfig = {
  key: 'wallet',
  ignoreList: ['activeWallet', 'message', 'pendingConnector', 'pendingWallet'],
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) => {
    /**
     * We prepend the listenerMiddleware here based on the comments
     * in the middleware sample on the RTK docus.
     *
     * https://redux-toolkit.js.org/api/createListenerMiddleware#middleware
     */
    const middlewares = getDefaultMiddleware().prepend(
      listenerMiddleware.middleware,
    );

    // Only allow logging via dev environment.
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }

    return middlewares;
  },
});

store.subscribe(() => {
  saveState({
    configuration: walletPersistConfig,
    state: store.getState().wallet,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
