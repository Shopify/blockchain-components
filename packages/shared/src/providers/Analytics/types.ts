export interface Subscriber {
  unsubscribe: () => void;
}

export enum Event {
  TokengateComponentRendered = 'TokengateComponentRendered',
  ConnectButtonClicked = 'ConnectButtonClicked',
}

export type EventType = `${Event}`;
