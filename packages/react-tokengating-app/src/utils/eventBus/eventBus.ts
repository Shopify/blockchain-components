import {EventNameWithSuffix} from '../../types/events';

const eventBus = {
  on(event: EventNameWithSuffix, callback?: Function) {
    console.log(`Listening to ${event}`);
    const listener = (response: Event) => {
      console.log('Event received', {
        event,
        variables: (response as CustomEvent)?.detail,
      });
      callback?.((response as CustomEvent)?.detail);
    };
    document.addEventListener(event, listener);
    return listener;
  },
  dispatch(event: EventNameWithSuffix, variables?: any) {
    console.log('Event sent', {event, variables});
    const customEvent = new CustomEvent(event, {detail: variables});
    document.dispatchEvent(customEvent);
  },
  remove(event: EventNameWithSuffix, listener: EventListener) {
    console.log(`Stop listening to ${event}`);
    document.removeEventListener(event, listener);
  },
};

export {eventBus};
