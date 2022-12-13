import {UnlockingToken} from '../TokengatingCard/types';
import {TokenListProps} from '../TokenList/types';

export const mapUnlockingTokensToTokenListProps = ({
  unlockingTokens,
}: {
  unlockingTokens?: UnlockingToken[];
}): TokenListProps['tokens'] =>
  unlockingTokens?.map((unlockingToken) => ({
    title: unlockingToken.token.title,
    subtitle: unlockingToken.token.contractName,
    imageUrl: unlockingToken.token.mediaUrl,
    orderLimit: unlockingToken.token.orderLimit
  }));
