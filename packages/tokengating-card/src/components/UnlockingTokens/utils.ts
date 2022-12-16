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
    consumedOrderLimit: unlockingToken.token.consumedOrderLimit,
    totalOrderLimit: unlockingToken.token.totalOrderLimit,
    rightContent:
      unlockingToken.token.totalOrderLimit &&
      unlockingToken.token.totalOrderLimit > 0
        ? `${unlockingToken.token.consumedOrderLimit}/${unlockingToken.token.totalOrderLimit}`
        : undefined,
  }));
