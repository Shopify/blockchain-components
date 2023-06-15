import {Fragment} from 'react';
import {formatWalletAddress} from 'shared';

import {TokenBase} from '../TokenBase';
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

  const separator = (
    <TokengateRequirementsSeparator logic={requirements?.logic} />
  );

  const tokens = requirements?.conditions.map((condition, index) => {
    const isLastCondition = index === requirements.conditions.length - 1;
    const separatorElement = isLastCondition ? null : separator;

    const unlockingToken = unlockingTokens?.find(
      ({contractAddress}) => contractAddress === condition.contractAddress,
    );

    if (unlockingToken) {
      const {collectionName, imageUrl, name} = unlockingToken;

      return (
        <Fragment key={condition.contractAddress}>
          <TokenBase
            image={{
              alt: name,
              url: imageUrl,
            }}
            round
            subtitle={collectionName}
            title={name}
          />
          {separatorElement}
        </Fragment>
      );
    }

    const {contractAddress, description, imageUrl, links, name} = condition;

    const alternateTitle = contractAddress
      ? `contract ${formatWalletAddress(contractAddress)}`
      : '';

    const badge = hasMissingTokens ? <CrossBadge /> : null;
    const subtitle = description || t('conditionDescription.any');
    const title = name || alternateTitle;

    return (
      <Fragment key={title}>
        <TokenBase
          badge={badge}
          image={{
            alt: title,
            url: imageUrl,
          }}
          links={links}
          round
          subtitle={subtitle}
          title={title}
        />
        {separatorElement}
      </Fragment>
    );
  });

  return (
    <TokenList isLoading={isLoading} separator>
      {tokens}
    </TokenList>
  );
};
