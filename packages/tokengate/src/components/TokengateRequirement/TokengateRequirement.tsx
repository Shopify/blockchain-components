import {GateRequirement, UnlockingToken} from 'types';

import {TokenList} from '../TokenList';

import {TokengateRequirementSeparator} from './TokengateRequirementSeparator';
import {mapGateRequirementToTokenListProps} from './utils';

const TokengateRequirement = ({
  gateRequirement,
  unlockingTokens,
  hasMissingTokens,
  isLoading,
}: {
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
  isLoading?: boolean;
}) => {
  const items = mapGateRequirementToTokenListProps({
    gateRequirement,
    unlockingTokens,
    hasMissingTokens,
  });

  return (
    <TokenList
      isLoading={isLoading}
      tokens={items}
      separator={
        <TokengateRequirementSeparator operator={gateRequirement?.operator} />
      }
    />
  );
};

export {TokengateRequirement};
