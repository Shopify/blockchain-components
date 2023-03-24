import {TokenList} from '../TokenList';
import {useTranslation} from '../../providers/I18nProvider';
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

  return (
    <TokenList
      isLoading={isLoading}
      tokens={items}
      separator={<TokengateRequirementsSeparator logic={requirements?.logic} />}
    />
  );
};

export {TokengateRequirements};
