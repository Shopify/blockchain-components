import {UnlockingToken} from '../TokengatingCard';
import {TokenList} from '../TokenList';

import {mapUnlockingTokensToTokenListProps} from './utils';

const UnlockingTokens = ({
  unlockingTokens,
}: {
  unlockingTokens?: UnlockingToken[];
}) => {
  const tokens = mapUnlockingTokensToTokenListProps({
    unlockingTokens,
  });

  return <TokenList tokens={tokens} />;
};

export {UnlockingTokens};
