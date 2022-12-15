import {UnlockingToken} from '../TokengatingCard';
import {TokenListProps} from '../TokenList';

export const mapUnlockingTokensToTokenListProps = ({
  unlockingTokens,
}: {
  unlockingTokens?: UnlockingToken[];
}): TokenListProps['tokens'] =>
  unlockingTokens?.map((unlockingToken) => ({
    title: unlockingToken.token.title,
    subtitle: unlockingToken.token.contractName,
    imageUrl: unlockingToken.token.mediaUrl,
    rightContent: `${unlockingToken.token.consumedOrderLimit}/${unlockingToken.token.totalOrderLimit}`,
  }));
