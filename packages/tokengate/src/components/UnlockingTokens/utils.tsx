import {TokenListProps} from '../TokenList';
import {RedemptionLimit, UnlockingToken} from '../../types';

import {OrderLimit} from './OrderLimit';

export const mapUnlockingTokensToTokenListProps = ({
  unlockingTokens,
  redemptionLimit,
}: {
  unlockingTokens?: UnlockingToken[];
  redemptionLimit?: RedemptionLimit;
}): TokenListProps['tokens'] =>
  unlockingTokens?.map((unlockingToken) => ({
    title: unlockingToken.token.title,
    subtitle: unlockingToken.token.contractName,
    imageUrl: unlockingToken.token.mediaUrl,
    consumedOrderLimit: unlockingToken.token.consumedOrderLimit,
    totalOrderLimit: redemptionLimit?.total,
    rightContent: (
      <OrderLimit
        consumedOrderLimit={unlockingToken.token.consumedOrderLimit}
        limitPerToken={redemptionLimit?.perToken}
      />
    ),
  }));
