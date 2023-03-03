import {configureStore} from '@reduxjs/toolkit';

import logger from '../middleware/loggerMiddleware';
import {initialState} from '../slices/walletSlice';
import {rootReducer} from '../store/combineReducers';
import {listenerMiddleware} from '../store/listenerMiddleware';

export const preloadedState = {
  wallet: initialState,
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
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

    return middlewares;
  },
});

export const storeWithLogger = configureStore({
  reducer: rootReducer,
  preloadedState,
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

    middlewares.push(logger);

    return middlewares;
  },
});
