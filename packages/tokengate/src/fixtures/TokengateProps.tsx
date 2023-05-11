import {deepMerge, DeepPartial} from 'shared';

import {ConditionArrayFixture} from './Condition';
import {
  UnlockingTokenFixture,
  UnlockingTokenFixtureType,
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenWithOrderLimitMetFixture,
} from './UnlockingToken';

import {TokengateProps} from '~/types';

const conditions = ConditionArrayFixture();

const unlockingTokenCryptoPunks = UnlockingTokenFixture({});
const unlockingTokenCryptoPunksWithOrderLimit =
  UnlockingTokenWithOrderLimitFixture({});
const unlockingTokenCryptoPunksWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture({});

const unlockingTokenMoonbirds = UnlockingTokenFixture({
  type: UnlockingTokenFixtureType.Moonbirds,
});
const unlockingTokenMoonbirdsWithOrderLimit =
  UnlockingTokenWithOrderLimitFixture({
    type: UnlockingTokenFixtureType.Moonbirds,
  });
const unlockingTokenMoonbirdsWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture({
    type: UnlockingTokenFixtureType.Moonbirds,
  });

export const TokengatePropsFixture = (
  customProps?: DeepPartial<TokengateProps>,
) =>
  deepMerge(
    {
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
        unlockingTokens: [unlockingTokenCryptoPunks],
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
        unlockingTokens: [unlockingTokenCryptoPunks, unlockingTokenMoonbirds],
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
          unlockingTokenCryptoPunksWithOrderLimit,
          unlockingTokenMoonbirdsWithOrderLimit,
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
          unlockingTokenCryptoPunksWithOrderLimitMet,
          unlockingTokenMoonbirdsWithOrderLimitMet,
        ],
        redemptionLimit: {
          total: 4,
          perToken: 2,
        },
      },
      customProps ?? {},
    ),
  );
