import {Text} from '@shopify/blockchain-components';

import {Requirements} from '../../types';

import {TokengateRequirementsSeparatorStyle} from './style';

const TokengateRequirementsSeparator = ({
  logic,
}: {
  logic?: Requirements['logic'];
}) => (
  <TokengateRequirementsSeparatorStyle $gap={logic ? '12px' : '0px'}>
    {logic ? (
      <Text as="span" variant="bodySm">
        {logic === 'ALL' ? 'AND' : 'OR'}
      </Text>
    ) : null}
  </TokengateRequirementsSeparatorStyle>
);

export {TokengateRequirementsSeparator};
