import {RedemptionLimit, UnlockingToken} from '../../types';
import {TokenListProps} from '../TokenList';

import {OrderLimit} from './OrderLimit';

export const mapUnlockingTokensToTokenListProps = ({
  unlockingTokens,
  redemptionLimit,
}: {
  unlockingTokens?: UnlockingToken[];
  redemptionLimit?: RedemptionLimit;
}): TokenListProps['tokens'] =>
  unlockingTokens?.map((unlockingToken) => ({
    title: unlockingToken.name,
    subtitle: unlockingToken.collectionName,
    imageUrl: unlockingToken.imageUrl,
    consumedOrderLimit: unlockingToken.consumedRedemptionLimit,
    totalOrderLimit: redemptionLimit?.total,
    rightContent: (
      <OrderLimit
        consumedOrderLimit={unlockingToken.consumedRedemptionLimit}
        limitPerToken={redemptionLimit?.perToken}
      />
    ),
  }));
