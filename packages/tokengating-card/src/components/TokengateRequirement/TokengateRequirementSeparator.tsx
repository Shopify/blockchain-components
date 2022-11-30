import {GateRequirement} from '../TokengatingCard/types';
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
