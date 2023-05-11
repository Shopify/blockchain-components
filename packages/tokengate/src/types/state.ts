export enum TokengateCardSection {
  TokengateRequirement = 'TokengateRequirement',
  TokengateRequirementMissingTokens = 'TokengateRequirementMissingTokens',
  UnlockingTokens = 'UnlockingTokens',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  AvailableSoon = 'AvailableSoon',
  SoldOut = 'SoldOut',
  TokengateRequirementSkeleton = 'TokengateRequirementSkeleton',
  OrderLimitReachedError = 'OrderLimitReachedError',
  MissingTokensError = 'MissingTokensError',
}

export enum TokengateCardState {
  AvailableSoon = 'AvailableSoon',
  Disconnected = 'Disconnected',
  Loading = 'Loading',
  OrderLimitReached = 'OrderLimitReached',
  RequirementsNotMet = 'RequirementsNotMet',
  SoldOut = 'SoldOut',
  Unlocked = 'Unlocked',
}

export const StateMap: Record<TokengateCardState, TokengateCardSection[]> = {
  AvailableSoon: [
    TokengateCardSection.TokengateRequirement,
    TokengateCardSection.AvailableSoon,
  ],
  Disconnected: [
    TokengateCardSection.TokengateRequirement,
    TokengateCardSection.ConnectWallet,
  ],
  Loading: [
    TokengateCardSection.TokengateRequirementSkeleton,
    TokengateCardSection.ConnectWallet,
  ],
  OrderLimitReached: [
    TokengateCardSection.UnlockingTokens,
    TokengateCardSection.ConnectedWallet,
    TokengateCardSection.OrderLimitReachedError,
  ],
  RequirementsNotMet: [
    TokengateCardSection.TokengateRequirementMissingTokens,
    TokengateCardSection.ConnectedWallet,
    TokengateCardSection.MissingTokensError,
  ],
  SoldOut: [
    TokengateCardSection.TokengateRequirement,
    TokengateCardSection.SoldOut,
  ],
  Unlocked: [
    TokengateCardSection.UnlockingTokens,
    TokengateCardSection.ConnectedWallet,
  ],
};
