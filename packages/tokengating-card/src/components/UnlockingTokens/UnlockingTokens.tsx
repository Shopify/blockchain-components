import {UnlockingToken} from '../TokengatingCard/types';
import {TokenList} from '../TokenList/TokenList';
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
