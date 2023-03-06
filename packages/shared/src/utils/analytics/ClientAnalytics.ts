import {
  Event,
  EventName,
  Subscriber,
  SubscriberFunction,
  SubscriberValue,
  Subscribers,
} from './types';

const subscribers: Subscribers = new Map();

/**
 * @param {EventName} eventname An event name indicating which event you would like to subscribe to.
 * @param {(payload: any) => void} callbackFunction Any callback function you would like to be invoked when the event is published.
 * @returns {Object} {unsubscribe} An object containing a cleanup function, unsubscribe, which will clean up the created subscription.
 */
const subscribe = (
  eventname: EventName,
  callbackFunction: SubscriberFunction,
): Subscriber => {
  const subscription: SubscriberValue = subscribers.get(eventname) || new Map();
  const subscriberId = Date.now().toString();

  // Add our callback function and unique id to the subscription.
  subscription.set(subscriberId, callbackFunction);

  // Update the subscribers with the subscription.
  subscribers.set(eventname, subscription);

  return {
    unsubscribe: () => {
      // Get the subscription in our map.
      const subscription = subscribers.get(eventname);

      // If the subscription is defined, remove the subscriber id.
      // This only removes the subscriber inside of the subscription.
      if (subscription) {
        subscription.delete(subscriberId);
      }
    },
  };
};

/**
 * @param {(payload: any) => void} callbackFunction Any callback function you would like to be invoked when an event is published.
 * @returns {void}
 */
const subscribeToAll = (callbackFunction: SubscriberFunction) => {
  const eventNamesArray = Object.values(Event);

  eventNamesArray.map((eventName) => {
    const {unsubscribe} = subscribe(eventName, (args) =>
      callbackFunction({
        eventName,
        eventArgs: args,
      }),
    );

    return unsubscribe;
  });

  const unsubscribe = () => subscribers.clear();

  return {
    unsubscribe,
  };
};

/**
 * @param {string} eventname An event name indicating which event to publish to subscribers.
 * @param {any | undefined} payload The data which was dispatched to the event.
 * @returns {void}
 */
const publishEvent = (eventname: EventName, payload?: any) => {
  const subscriptions = subscribers.get(eventname);

  // Loop through our subscriptions for the event name and run the
  // callback functions for the provided subscription.
  subscriptions?.forEach((subscription) => subscription(payload));
};

export const ClientAnalytics = {
  subscribe,
  subscribeToAll,
  publishEvent,
  eventNames: Event,
};
