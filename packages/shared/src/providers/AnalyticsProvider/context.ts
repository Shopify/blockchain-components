import {createContext} from 'react';

import {SubscriberFunction} from './types';

export interface AnalyticsProviderValue {
  subscribe: (
    eventname: string,
    callbackFunction: SubscriberFunction,
  ) => {
    unsubscribe: () => void;
  };
  subscribeToAll: (callbackFunction: SubscriberFunction) => {
    unsubscribe: () => void;
  };
  publishEvent: (eventname: string, payload?: any) => void;
  eventNames?: any;
}

const defaultContextValue: AnalyticsProviderValue = {
  subscribe: () => ({
    unsubscribe: () => {},
  }),
  subscribeToAll: () => ({
    unsubscribe: () => {},
  }),
  publishEvent: () => {
    console.log('default provider');
  },
};

export const AnalyticsContext =
  createContext<AnalyticsProviderValue>(defaultContextValue);
