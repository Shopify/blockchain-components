import {useMemo} from 'react';

import {useTokengateHeadings} from './useTokengateHeadings';

import {StateMap, TokengateCardState, UnlockingToken} from '~/types';
import type {TokengateProps} from '~/types';

export type UseTokengateCardStateProps = Omit<
  TokengateProps,
  'connectButton' | 'connectedButton'
>;

export const useTokengateCardState = (props: UseTokengateCardStateProps) => {
  const {
    active,
    isConnected,
    isLoading,
    isLocked,
    isSoldOut,
    redemptionLimit,
    requirements,
    unlockingTokens,
  } = props;

  const locked = useMemo(() => {
    // Default to isLocked when provided
    if (isLocked !== undefined) return isLocked;

    if (!isConnected || !unlockingTokens || unlockingTokens.length === 0) {
      return true;
    }

    const arrayLogicFunction = requirements?.logic === 'ALL' ? 'every' : 'some';

    const hasTokenForAllConditions = requirements?.conditions[
      arrayLogicFunction
    ]((condition) =>
      Boolean(
        unlockingTokens.find(
          (unlockingToken) =>
            unlockingToken.contractAddress.toLowerCase() ===
            condition.contractAddress?.toLowerCase(),
        ),
      ),
    );

    return !hasTokenForAllConditions;
  }, [
    isConnected,
    isLocked,
    requirements?.conditions,
    requirements?.logic,
    unlockingTokens,
  ]);

  const hasReachedOrderLimit = useMemo(() => {
    const consumedRedemptions =
      unlockingTokens?.reduce(
        (accumulator: number, unlockingToken: UnlockingToken) => {
          if (!unlockingToken.consumedRedemptionLimit) return accumulator;

          return accumulator + Number(unlockingToken.consumedRedemptionLimit);
        },
        0,
      ) || 0;

    const limit = redemptionLimit?.total;

    return Boolean(
      limit && consumedRedemptions > 0 && consumedRedemptions >= limit,
    );
  }, [redemptionLimit?.total, unlockingTokens]);

  const requirementsNotMet = useMemo(() => {
    return !isLoading && isConnected && locked && Boolean(unlockingTokens);
  }, [isConnected, isLoading, locked, unlockingTokens]);

  const sections = useMemo(() => {
    if (isLoading) {
      return StateMap[TokengateCardState.Loading];
    }

    if (isConnected && !locked && hasReachedOrderLimit) {
      return StateMap[TokengateCardState.OrderLimitReached];
    }

    if (isConnected && !locked) {
      return StateMap[TokengateCardState.Unlocked];
    }

    if (requirementsNotMet) {
      return StateMap[TokengateCardState.RequirementsNotMet];
    }

    if (isSoldOut) {
      return StateMap[TokengateCardState.SoldOut];
    }

    const now = new Date();
    const dateObject = active?.start ? new Date(active.start) : null;

    if (dateObject && dateObject > now) {
      return StateMap[TokengateCardState.AvailableSoon];
    }

    return StateMap[TokengateCardState.Disconnected];
  }, [
    active?.start,
    hasReachedOrderLimit,
    isConnected,
    isLoading,
    isSoldOut,
    locked,
    requirementsNotMet,
  ]);

  const headings = useTokengateHeadings({
    ...props,
    locked,
  });

  return {
    sections,
    isLocked: locked,
    hasRequirementsNotMet: requirementsNotMet,
    ...headings,
  };
};
