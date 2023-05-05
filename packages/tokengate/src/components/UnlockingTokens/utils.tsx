import {TokenListProps} from '../TokenList';
import {RedemptionLimit, UnlockingToken} from '../../types';

import {OrderLimit} from './OrderLimit';

export const mapUnlockingTokensToTokenListProps = ({
  unlockingTokens,
  redemptionLimit,
}: {
  unlockingTokens?: UnlockingToken[];
  redemptionLimit?: RedemptionLimit;
}): TokenListProps['tokens'] => {
  console.log('unlockingTokens', unlockingTokens, 'redemptionLimit', redemptionLimit);

  return unlockingTokens?.map((unlockingToken) => {
    console.log('unlockingToken', unlockingToken);
    return {
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
    };
  });
};
