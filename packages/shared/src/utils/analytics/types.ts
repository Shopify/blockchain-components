export enum Event {
  TokengateComponentRendered = 'TokengateComponentRendered',
}

export type EventName = `${Event}`;

export interface Subscriber {
  unsubscribe: () => void;
}

export type SubscriberFunction = (payload: any) => void;
export type SubscriberValue = Map<string, SubscriberFunction>;
export type Subscribers = Map<EventName | string, SubscriberValue>;
