export enum EventName {
  RequestWalletVerificationMessage = 'RequestWalletVerificationMessage',
  CheckIfWalletMeetsRequirements = 'CheckIfWalletMeetsRequirements',
}
export interface EventBusEvent {
  event: EventName;
  variables: any;
  response: any;
}

export type EventNameWithSuffix =
  | WithSuffix<EventName, '-reactToTheme'>
  | WithSuffix<EventName, '-themeToReact'>;

export interface RequestWalletVerificationMessageEvent extends EventBusEvent {
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

export interface CheckIfWalletMeetsRequirementsEvent extends EventBusEvent {
  event: EventName.CheckIfWalletMeetsRequirements;
  payload: {
    address: string;
    message: string;
    signature: string;
  };
  response: {
    isUnlocked: boolean;
    unlockingTokens: [];
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
