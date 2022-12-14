import {GateRequirement, UnlockingToken} from '../TokengatingCard';
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
  const tokenSeries = mapGateRequirementToTokenListProps({
    gateRequirement,
    unlockingTokens,
    hasMissingTokens,
  });

  return (
    <TokenList
      isLoading={isLoading}
      tokens={tokenSeries}
      separator={
        <TokengateRequirementSeparator operator={gateRequirement?.operator} />
      }
    />
  );
};

export {TokengateRequirement};
