import {addEvent} from './slice';
import store from './store';
import {EventType} from './types';

export const publish = (eventname: EventType) => {
  console.log('publishing event', eventname);

  return store.dispatch(addEvent(eventname));
};
