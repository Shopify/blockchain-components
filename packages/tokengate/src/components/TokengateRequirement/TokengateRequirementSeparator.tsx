import {Text} from 'shared';

import {GateRequirement} from '../Tokengate';

import {Divider, Wrapper} from './style';

const TokengateRequirementSeparator = ({
  operator,
}: {
  operator?: GateRequirement['operator'];
}) => (
  <Wrapper>
    <Divider />
    {/* We need to have a line on either side of the operator
     * text, and in order to accomplish that, we can wrap the
     * text component in a fragment and add another divider
     * afterwards.
     */}
    {operator ? (
      <>
        <Text as="span" variant="bodySm">
          {operator}
        </Text>
        <Divider />
      </>
    ) : null}
  </Wrapper>
);

export {TokengateRequirementSeparator};
