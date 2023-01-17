import {Requirements, Condition, UnlockingToken} from 'types';

import {TokenListProps} from '../TokenList';

import {TokengateRequirementsBadge} from './TokengateRequirementsBadge';

export const mapRequirementsToTokenListProps = ({
  requirements,
  unlockingTokens,
  hasMissingTokens,
}: {
  requirements?: Requirements;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
}): TokenListProps['tokens'] =>
  requirements?.conditions.map((condition) => {
    let badge;

    // Add the error badges to the token series that do not have an unlocking token
    if (hasMissingTokens) {
      const unlockingTokenForCurrentCondition = findUnlockingTokenForCondition({
        condition,
        unlockingTokens,
      });
      badge = unlockingTokens?.length !== undefined &&
        !unlockingTokenForCurrentCondition && <TokengateRequirementsBadge />;
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
