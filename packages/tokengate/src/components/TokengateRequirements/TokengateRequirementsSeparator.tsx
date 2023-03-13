import {Text} from 'shared';

import {Requirements} from '../../types';

const TokengateRequirementsSeparator = ({
  logic,
}: {
  logic?: Requirements['logic'];
}) => {
  const DividerLine = <span className="sbc-h-px sbc-flex-1 sbc-bg-divider" />;

  return (
    <div
      className={`sbc-my-divider sbc-flex sbc-items-center ${
        logic ? 'sbc-gap-x-3' : 'sbc-gap-x-0'
      }`}
    >
      {DividerLine}
      {logic ? (
        <Text as="span" variant="bodySm">
          {logic === 'ALL' ? 'AND' : 'OR'}
        </Text>
      ) : null}
      {DividerLine}
    </div>
  );
};

export {TokengateRequirementsSeparator};
