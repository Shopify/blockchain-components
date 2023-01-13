import {GateRequirement, Condition, UnlockingToken} from 'types';

import {TokenListProps} from '../TokenList';

import {TokengateRequirementBadge} from './TokengateRequirementBadge';

export const mapGateRequirementToTokenListProps = ({
  gateRequirement,
  unlockingTokens,
  hasMissingTokens,
}: {
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
}): TokenListProps['tokens'] =>
  gateRequirement?.conditions.map((condition) => {
    let badge;

    // Add the error badges to the token series that do not have an unlocking token
    if (hasMissingTokens) {
      const unlockingTokenForCurrentCondition = findUnlockingTokenForCondition({
        condition,
        unlockingTokens,
      });
      badge = unlockingTokens?.length !== undefined &&
        !unlockingTokenForCurrentCondition && <TokengateRequirementBadge />;
    }

    return {
      title: condition.name,
      subtitle: condition.conditionsDescription,
      imageUrl: condition.imageUrl,
      badge,
      round: true,
    };
  });

export const findUnlockingTokenForCondition = ({
  condition,
  unlockingTokens,
}: {
  condition: Condition;
  unlockingTokens?: UnlockingToken[];
}) =>
  unlockingTokens?.find(
    (unlockingToken) =>
      unlockingToken.token.contractAddress === condition.collectionAddress,
  );
