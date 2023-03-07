import {SubscriberFunction, Subscriber, Subscribers} from './types';
import {eventNames} from './const';

const subscribers: Subscribers = {};

const subscribe = (
  eventname: string,
  callbackFunction: SubscriberFunction,
): Subscriber => {
  const subs = subscribers[eventname];

  // subs could be undefined, but the casting of subscribers to Subscribers
  // does not let the linter understand that it could be undefined
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!subs) {
    subscribers[eventname] = {};
  }

  const subscriberId = Date.now().toString();
  subscribers[eventname][subscriberId] = callbackFunction;

  return {
    unsubscribe: () => {
      delete subscribers[eventname][subscriberId];
    },
  };
};

const subscribeToAll = (callbackFunction: SubscriberFunction) => {
  const eventNamesArray = Object.values(eventNames);
  const unSubscribers = eventNamesArray.map((eventName) => {
    const {unsubscribe} = subscribe(eventName, (args) =>
      callbackFunction({
        eventName,
        eventArgs: args,
      }),
    );
    return unsubscribe;
  });

  const unsubscribe = () =>
    unSubscribers.forEach((unSubscriber) => {
      unSubscriber();
    });

  return {
    unsubscribe,
  };
};

const publishEvent = (eventname: string, payload?: any) => {
  const subs = subscribers[eventname];

  // subs could be undefined, but the casting of subscribers to Subscribers
  // does not let the linter understand that it could be undefined
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (subs) {
    Object.keys(subs).forEach((key) => {
      subs[key](payload);
    });
  }
};

export const ClientAnalytics = {
  subscribe,
  subscribeToAll,
  publishEvent,
  eventNames,
};
