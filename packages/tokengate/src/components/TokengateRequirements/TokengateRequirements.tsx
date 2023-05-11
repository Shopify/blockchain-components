import {formatWalletAddress} from 'shared';

import {TokenList} from '../TokenList';

import {TokengateRequirementsSeparator} from './TokengateRequirementsSeparator';

import {CrossBadge} from '~/assets/icons/CrossBadge';
import {useTranslation} from '~/hooks/useTranslation';
import {Requirements, UnlockingToken} from '~/types';

export interface TokengateRequirementsProps {
  hasMissingTokens?: boolean;
  isLoading?: boolean;
  requirements?: Requirements;
  unlockingTokens?: UnlockingToken[];
}

export const TokengateRequirements = ({
  hasMissingTokens,
  isLoading,
  requirements,
  unlockingTokens,
}: TokengateRequirementsProps) => {
  const {t} = useTranslation('TokengateRequirements');

  const tokens = requirements?.conditions.map((condition) => {
    const unlockingToken = unlockingTokens?.find(
      ({contractAddress}) => contractAddress === condition.contractAddress,
    );

    if (unlockingToken) {
      return {
        imageUrl: unlockingToken.imageUrl,
        round: true,
        subtitle: unlockingToken.collectionName,
        title: unlockingToken.name,
      };
    }

    const {contractAddress, description, imageUrl, links, name} = condition;

    const alternateTitle = contractAddress
      ? `contract ${formatWalletAddress(contractAddress)}`
      : '';

    return {
      badge: hasMissingTokens ? <CrossBadge /> : null,
      imageUrl,
      links,
      round: true,
      subtitle: description || t('conditionDescription.any'),
      title: name || alternateTitle,
    };
  });

  return (
    <TokenList
      isLoading={isLoading}
      tokens={tokens}
      separator={<TokengateRequirementsSeparator logic={requirements?.logic} />}
    />
  );
};
