import {deepMerge, DeepPartial} from 'shared';

import {TokengateProps} from '../components';

import {TokenSeriesArrayFixture} from './TokenSeries';
import {
  UnlockingTokenFixture,
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenWithOrderLimitMetFixture,
  UnlockingTokenFixtureType,
} from './UnlockingToken';

const tokenSeries = TokenSeriesArrayFixture();

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
      gateRequirement: {
        id: 'gateRequirement-id',
        tokenSeries,
        operator: 'OR' as const,
      },
      onConnectWallet: () => {},
      onConnectedWalletActions: () => {},
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
        wallet: {
          address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
        },
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
      },
      customProps ?? {},
    ),
  );
