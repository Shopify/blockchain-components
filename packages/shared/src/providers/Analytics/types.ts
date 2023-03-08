export interface Subscriber {
  unsubscribe: () => void;
}

export enum Event {
  TokengateComponentRendered = 'TokengateComponentRendered',
}

export type EventType = `${Event}`;
