import {GateRequirement} from '../TokengatingCard/types';
import {TokenList} from '../TokenList/TokenList';
import {TokengateRequirementSeparator} from './TokengateRequirementSeparator';

const TokengateRequirement = ({
  gateRequirement,
}: {
  gateRequirement?: GateRequirement;
}) => (
  <TokenList
    tokens={gateRequirement?.tokenSeries}
    separator={
      <TokengateRequirementSeparator operator={gateRequirement?.operator} />
    }
  />
);

export {TokengateRequirement};
