// import {logger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';

import {initialState} from '../slices/walletSlice';
import {rootReducer} from '../store/combineReducers';
import {listenerMiddleware} from '../store/listenerMiddleware';

const preloadedState = {
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

    // Uncomment the following line if you need to enable logging
    // during test development.
    // middlewares.push(logger);

    return middlewares;
  },
});
