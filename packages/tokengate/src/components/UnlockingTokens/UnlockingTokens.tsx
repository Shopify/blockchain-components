import {TokenList} from '../TokenList';

import {OrderLimit} from './OrderLimit';

import type {RedemptionLimit, UnlockingToken} from '~/types';

interface UnlockingTokensProps {
  unlockingTokens?: UnlockingToken[];
  redemptionLimit?: RedemptionLimit;
}

export const UnlockingTokens = ({
  unlockingTokens,
  redemptionLimit,
}: UnlockingTokensProps) => {
  const tokens = unlockingTokens?.map(
    ({collectionName, consumedRedemptionLimit, imageUrl, name}) => ({
      title: name,
      subtitle: collectionName,
      imageUrl,
      consumedOrderLimit: consumedRedemptionLimit,
      totalOrderLimit: redemptionLimit?.total,
      rightContent: (
        <OrderLimit
          consumedOrderLimit={consumedRedemptionLimit}
          limitPerToken={redemptionLimit?.perToken}
        />
      ),
    }),
  );

  return <TokenList tokens={tokens} />;
};
