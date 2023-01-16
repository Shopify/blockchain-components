import {Requirements, UnlockingToken} from 'types';

import {TokenList} from '../TokenList';

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
  const items = mapRequirementsToTokenListProps({
    requirements,
    unlockingTokens,
    hasMissingTokens,
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
