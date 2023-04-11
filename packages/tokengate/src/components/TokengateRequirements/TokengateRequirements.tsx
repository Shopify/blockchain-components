import {Text} from 'shared';

import {TokenList} from '../TokenList';
import {useTranslation} from '../../hooks/useTranslation';
import {Requirements, UnlockingToken} from '../../types';

import {TokengateRequirementsSeparator} from './TokengateRequirementsSeparator';
import {mapRequirementsToTokenListProps} from './utils';

const TokengateRequirements = ({
  requirements,
  unlockingTokens,
  hasMissingTokens,
  isLoading,
}: {
  requirements?: Requirements;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
  isLoading?: boolean;
}) => {
  const {t} = useTranslation('TokengateRequirements');
  const items = mapRequirementsToTokenListProps({
    requirements,
    unlockingTokens,
    hasMissingTokens,
    t,
  });

  if (!requirements?.conditions.length && !isLoading) {
    return (
      <div className="sbc-py-5 sbc-text-center" data-testid="no-segments">
        <div className="sbc-rounded sbc-border sbc-border-[#C9CCCF] sbc-p-3 sbc-border-dashed">
          <Text className="sbc-capitalize" color="secondary" variant="bodyLg">
            {t('noSegments')}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <TokenList
      isLoading={isLoading}
      tokens={items}
      separator={<TokengateRequirementsSeparator logic={requirements?.logic} />}
    />
  );
};

export {TokengateRequirements};
