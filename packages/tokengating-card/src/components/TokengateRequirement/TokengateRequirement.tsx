import {GateRequirement, UnlockingToken} from '../TokengatingCard/types';
import {TokenList} from '../TokenList/TokenList';
import {TokengateRequirementSeparator} from './TokengateRequirementSeparator';
import {mapGateRequirementToTokenListProps} from './utils';

const TokengateRequirement = ({
  gateRequirement,
  unlockingTokens,
  hasMissingTokens,
}: {
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
}) => {
  const tokenSeries = mapGateRequirementToTokenListProps({
    gateRequirement,
    unlockingTokens,
    hasMissingTokens,
  });

  return (
    <TokenList
      tokens={tokenSeries}
      separator={
        <TokengateRequirementSeparator operator={gateRequirement?.operator} />
      }
    />
  );
};

export {TokengateRequirement};
