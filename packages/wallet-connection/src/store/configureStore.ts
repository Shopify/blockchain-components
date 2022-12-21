import {logger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import {initialState} from '../slices/walletSlice';

import {rootReducer} from './combineReducers';

const preloadedState = {
  wallet: initialState,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    /**
     * We can explore adding an ENV variable to add logging middleware.
     *
     * Then, we could do something like:
     * `yarn run devWithLogger` and get state management logging.
     */
    middlewares.push(logger);

    return middlewares;
  },
});

persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
