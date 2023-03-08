import {configureStore} from '@reduxjs/toolkit';

import {analyticsSlice} from './slice';

// import {rootReducer} from './combineReducers';
import {listenerMiddleware} from './listenerMiddleware';

const store = configureStore({
  reducer: analyticsSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
