import {TokenList} from '../TokenList';

import {mapUnlockingTokensToTokenListProps} from './utils';

import {UnlockingToken, RedemptionLimit} from '~/types';

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
