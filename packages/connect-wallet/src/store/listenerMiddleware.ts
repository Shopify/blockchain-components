import {
  createListenerMiddleware,
  addListener as addRTKListener,
} from '@reduxjs/toolkit';
import type {
  TypedStartListening as RTKTypedStartListening,
  TypedAddListener as RTKTypedAddListener,
} from '@reduxjs/toolkit';

import type {RootState, AppDispatch} from './configureStore';

export const listenerMiddleware = createListenerMiddleware();

export type TypedStartListening = RTKTypedStartListening<
  RootState,
  AppDispatch
>;

export const startListening =
  listenerMiddleware.startListening as TypedStartListening;

export const addListener = addRTKListener as RTKTypedAddListener<
  RootState,
  AppDispatch
>;

export type AddListenerOptions = Parameters<typeof addListener>[0];
