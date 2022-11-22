import {EventBusEvent} from '../types/events';

const eventBus = {
  on(event: EventBusEvent, callback?: Function) {
    document.addEventListener(event, (response) => callback?.(response));
  },
  dispatch(event: EventBusEvent, data?: any) {
    document.dispatchEvent(new CustomEvent(event, data));
  },
  remove(event: EventBusEvent, listener: EventListener) {
    document.removeEventListener(event, listener);
  },
};

export {eventBus};
