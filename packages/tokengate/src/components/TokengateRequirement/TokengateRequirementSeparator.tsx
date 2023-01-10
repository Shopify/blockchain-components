import {Text} from 'shared';

import {GateRequirement} from '../Tokengate';

import {TokengateRequirementSeparatorStyle} from './style';

const TokengateRequirementSeparator = ({
  operator,
}: {
  operator?: GateRequirement['operator'];
}) => (
  <TokengateRequirementSeparatorStyle $gap={operator ? '12px' : '0px'}>
    {operator ? (
      <Text as="span" variant="bodySm">
        {operator}
      </Text>
    ) : null}
  </TokengateRequirementSeparatorStyle>
);

export {TokengateRequirementSeparator};
