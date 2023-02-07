import {TokenList} from '../TokenList';
import {UnlockingToken, RedemptionLimit} from '../../types';

import {mapUnlockingTokensToTokenListProps} from './utils';

const UnlockingTokens = ({
  unlockingTokens,
  redemptionLimit,
}: {
  unlockingTokens?: UnlockingToken[];
  redemptionLimit?: RedemptionLimit;
}) => {
  const tokens = mapUnlockingTokensToTokenListProps({
    unlockingTokens,
    redemptionLimit,
  });

  return <TokenList tokens={tokens} />;
};

export {UnlockingTokens};
