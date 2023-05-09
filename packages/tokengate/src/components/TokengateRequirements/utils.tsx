import {formatWalletAddress} from 'shared';

import {CrossBadge} from '../../assets/icons/CrossBadge';
import {Requirements, Condition, UnlockingToken} from '../../types';
import {TokenListProps} from '../TokenList';

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
    // See if we have an unlocking token for this condition.
    const unlockingTokenForCurrentCondition = findUnlockingTokenForCondition({
      condition,
      unlockingTokens,
    });

    if (unlockingTokenForCurrentCondition) {
      return {
        title: unlockingTokenForCurrentCondition.name,
        subtitle: unlockingTokenForCurrentCondition.collectionName,
        imageUrl: unlockingTokenForCurrentCondition.imageUrl,
        round: true,
      };
    }

    return {
      title: getConditionTitle(condition),
      subtitle: condition.description ?? t('conditionDescription.any'),
      imageUrl: condition.imageUrl,
      links: condition.links,
      badge: hasMissingTokens ? <CrossBadge /> : null,
      round: true,
    };
  });

export const getConditionTitle = ({name, contractAddress}: Condition) => {
  if (name) return name;

  if (!contractAddress) return '';

  return `contract ${formatWalletAddress(contractAddress)}`;
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
      unlockingToken.contractAddress === condition.contractAddress,
  );
