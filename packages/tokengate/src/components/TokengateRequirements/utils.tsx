import {formatWalletAddress} from 'shared';

import {TokenListProps} from '../TokenList';
import {Requirements, Condition, UnlockingToken} from '../../types';

import {TokengateRequirementsBadge} from './TokengateRequirementsBadge';

export const mapRequirementsToTokenListProps = ({
  requirements,
  unlockingTokens,
  hasMissingTokens,
  t,
}: {
  requirements?: Requirements;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
  t: (key: string) => string;
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
      title: getConditionTitle(condition),
      subtitle: condition.description ?? t('conditionDescription.any'),
      imageUrl: condition.imageUrl,
      badge,
      round: true,
    };
  });

export const getConditionTitle = ({name, collectionAddress}: Condition) => {
  if (name) return name;

  if (!collectionAddress) return '';

  return `contract ${formatWalletAddress(collectionAddress)}`;
};

export const findUnlockingTokenForCondition = ({
  condition,
  unlockingTokens,
}: {
  condition: Condition;
  unlockingTokens?: UnlockingToken[];
}) =>
  unlockingTokens?.find(
    (unlockingToken) =>
      unlockingToken.collectionAddress === condition.collectionAddress,
  );
