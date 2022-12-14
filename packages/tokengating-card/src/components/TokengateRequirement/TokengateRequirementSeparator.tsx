import {GateRequirement} from '../TokengatingCard';

import {TokengateRequirementSeparatorStyle} from './style';

const TokengateRequirementSeparator = ({
  operator,
}: {
  operator?: GateRequirement['operator'];
}) => (
  <TokengateRequirementSeparatorStyle>
    {operator?.toUpperCase()}
  </TokengateRequirementSeparatorStyle>
);

export {TokengateRequirementSeparator};
