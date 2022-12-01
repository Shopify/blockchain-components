import {GateRequirement, UnlockingToken} from '../TokengatingCard/types';
import {TokenList} from '../TokenList/TokenList';
import {TokengateRequirementBadge} from './TokengateRequirementBadge';
import {TokengateRequirementSeparator} from './TokengateRequirementSeparator';

const TokengateRequirement = ({
  gateRequirement,
  unlockingTokens,
}: {
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
}) => {
  const tokenSeriesWithBadge = gateRequirement?.tokenSeries.map((token) => {
    // TODO: For now, we are assuming that if there are unlockingTokens,
    // all the badges should be the cross.
    // For the future, we should check if there are no unlockingTokens related to the current tokenSeries
    const badge = unlockingTokens && <TokengateRequirementBadge />;
    return {badge, ...token};
  });
  return (
    <TokenList
      tokens={tokenSeriesWithBadge}
      separator={
        <TokengateRequirementSeparator operator={gateRequirement?.operator} />
      }
    />
  );
};

export {TokengateRequirement};
