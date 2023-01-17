import {deepMerge, DeepPartial} from 'shared';
import {TokengateProps} from 'types';

import {ConditionArrayFixture} from './Condition';
import {
  UnlockingTokenFixture,
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenWithOrderLimitMetFixture,
  UnlockingTokenFixtureType,
} from './UnlockingToken';

const conditions = ConditionArrayFixture();

const unlockingTokenCommerceTown = UnlockingTokenFixture();

const unlockingTokenCommerceTownWithOrderLimit =
  UnlockingTokenWithOrderLimitFixture();

const unlockingTokenCommerceTownWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture();

const unlockingTokenSquad = UnlockingTokenFixture(
  {},
  UnlockingTokenFixtureType.Squaddy,
);

const unlockingTokenSquadWithOrderLimit = UnlockingTokenWithOrderLimitFixture(
  {},
  UnlockingTokenFixtureType.Squaddy,
);

const unlockingTokenSquadWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture({}, UnlockingTokenFixtureType.Squaddy);

export const TokengatePropsFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  deepMerge(
    {
      isLocked: true,
      requirements: {
        id: 'requirements-id',
        conditions,
        logic: 'ANY' as const,
      },
      reaction: {
        type: 'exclusive_access',
      },
    },
    customProps ?? {},
  ) as TokengateProps;

export const TokengatePropsNotConnectedFixture = (
  customProps?: DeepPartial<TokengateProps>,
) => TokengatePropsFixture(customProps ?? {});

export const TokengatePropsConnectedFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  TokengatePropsFixture(
    deepMerge(
      {
        isConnected: true,
        unlockingTokens: [unlockingTokenCommerceTown],
      },
      customProps ?? {},
    ),
  );

export const TokengatePropsUnlockedFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  TokengatePropsConnectedFixture(
    deepMerge(
      {
        isLocked: false,
        unlockingTokens: [unlockingTokenCommerceTown, unlockingTokenSquad],
      },
      customProps ?? {},
    ),
  );

export const TokengatePropsUnlockedWithOrderLimitFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  TokengatePropsUnlockedFixture(
    deepMerge(
      {
        unlockingTokens: [
          unlockingTokenCommerceTownWithOrderLimit,
          unlockingTokenSquadWithOrderLimit,
        ],
        redemptionLimit: {
          total: 4,
          perToken: 2,
        },
      },
      customProps ?? {},
    ),
  );

export const TokengatePropsUnlockedWithOrderLimitMetFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  TokengatePropsUnlockedFixture(
    deepMerge(
      {
        unlockingTokens: [
          unlockingTokenCommerceTownWithOrderLimitMet,
          unlockingTokenSquadWithOrderLimitMet,
        ],
        redemptionLimit: {
          total: 4,
          perToken: 2,
        },
      },
      customProps ?? {},
    ),
  );
