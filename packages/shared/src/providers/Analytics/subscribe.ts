import {addListener} from './listenerMiddleware';
import {addEvent} from './slice';
import store from './store';
import {EventType} from './types';

type CallbackFn = (params: any) => void;

export const subscribe = (eventname: EventType, callback: CallbackFn) => {
  const listener = addListener({
    predicate: (action) => {
      console.log('action', action);

      return (
        action.type === addEvent.toString() && action.payload === eventname
      );
    },
    effect: () => callback(eventname),
  });

  return store.dispatch(listener);
};

export const subscribeToAll = (callback: CallbackFn) => {
  const listener = addListener({
    predicate: (action) => {
      return action.type === addEvent.toString();
    },
    effect: (action) => callback(action.payload),
  });

  return store.dispatch(listener);
};
