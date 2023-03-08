import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {EventType} from './types';

export interface AnalyticsSliceType {
  events: EventType[];
}

export const initialState: AnalyticsSliceType = {
  events: [],
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
    },
  },
});

export const {addEvent} = analyticsSlice.actions;
