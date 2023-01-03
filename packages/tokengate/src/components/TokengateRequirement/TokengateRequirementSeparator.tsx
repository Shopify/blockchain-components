import {GateRequirement} from '../Tokengate';

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
