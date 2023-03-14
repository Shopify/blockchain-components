import {useCallback, useEffect} from 'react';

import {getClientBrowserParameters} from '../../clientBrowserParameters';

import {
  SubscriberFunction,
  Subscriber,
  Subscribers,
  SubscriberValue,
} from './types';
import {eventNames, shopifyServices} from './const';

const subscribers: Subscribers = new Map();

/**
 * @param {string} eventname An event name indicating which event you would like to subscribe to.
 * @param {(payload: any) => void} callbackFunction Any callback function you would like to be invoked when the event is published.
 * @returns {Object} {unsubscribe} An object containing a cleanup function, unsubscribe, which will clean up the created subscription.
 */
export const subscribe = (
  eventname: string,
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
export const subscribeToAll = (callbackFunction: SubscriberFunction) => {
  const eventNamesArray = Object.values(eventNames);

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
export const publishEvent = (eventname: string, payload?: any) => {
  const subscriptions = subscribers.get(eventname);
  const additionalPayload = getAdditionalEventPayload();

  // Loop through our subscriptions for the event name and run the
  // callback functions for the provided subscription.
  subscriptions?.forEach((subscription) =>
    subscription({...additionalPayload, ...payload}),
  );
};

/**
 * @param {() => void | undefined)} callback The original callback function
 * @param {string} eventName An event name indicating which event to publish to subscribers.
 * @param {any | undefined} payload The data which was dispatched to the event.
 * @returns {() => void}
 */
export const useEventWithTracking = ({
  callback,
  eventName,
  payload,
}: {
  callback?: (payload: any) => void;
  eventName?: string;
  payload?: any;
}) =>
  useCallback(
    (eventPayload: any) => {
      if (eventName) {
        publishEvent(eventName, payload);
      }
      if (callback) {
        callback(eventPayload);
      }
    },
    [callback, eventName, payload],
  );

/**
 * @returns {object} An object containing the additional payload we want to send to all published events
 */
export const getAdditionalEventPayload = () => {
  // Casting as any to cover server side rendering
  const {pathname} = (window as any)?.location || {};

  return {
    shopifyService: getShopifyService(pathname),
    ...getClientBrowserParameters(),
  };
};

/**
 * @param {string} pathname The client's complete URL's pathname
 * @returns {string} A string that represents the Shopify Service the URL corresponds to (Checkout, PDP, other)
 */
export const getShopifyService = (pathname: string) => {
  const servicesValues = Object.values(shopifyServices);
  const currentService = servicesValues.find(
    (service) =>
      service.pathname && new RegExp(`/${service.pathname}(/)*`).exec(pathname),
  );
  return currentService?.name ?? shopifyServices.OTHER.name;
};

/**
 * @param {string} eventName An event name indicating which event to publish to subscribers.
 * @returns {void}
 */
export const useComponentRenderedTracking = (eventName: string) => {
  useEffect(() => {
    publishEvent(eventName);
  }, [eventName]);
};
