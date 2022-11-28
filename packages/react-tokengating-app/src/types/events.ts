export enum EventName {
  RequestWalletVerificationMessage = 'RequestWalletVerificationMessage',
  WalletVerificationMessageGenerated = 'WalletVerificationMessageGenerated',
}
export interface EventBusEvent {
  event: EventName;
  variables: any;
  response: any;
}

export type EventNameWithSuffix =
  | WithSuffix<EventName, '-reactToTheme'>
  | WithSuffix<EventName, '-themeToReact'>;

export interface RequestWalletVerification extends EventBusEvent {
  event: EventName.RequestWalletVerificationMessage;
  payload: {
    address: string;
  };
  response: {
    verification?: {
      message: string;
      generatedAt: string;
    };
  };
}

export type PayloadErrors = {
  /**
   * Any errors included during the event bus payload.
   */
  userErrors?: {
    message: string;
    internalError: Error;
  }[];
};

type WithSuffix<
  Type extends EventName,
  Suffix extends string,
> = `${Type}${Suffix}`;
