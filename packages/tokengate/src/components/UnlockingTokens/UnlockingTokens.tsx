import {TokenBase} from '../TokenBase';
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
    ({collectionName, consumedRedemptionLimit, imageUrl, name}) => (
      <TokenBase
        image={{
          alt: name,
          url: imageUrl,
        }}
        key={imageUrl}
        rightContent={
          <OrderLimit
            consumedOrderLimit={consumedRedemptionLimit}
            limitPerToken={redemptionLimit?.perToken}
          />
        }
        round={false}
        subtitle={collectionName}
        title={name}
      />
    ),
  );

  return <TokenList>{tokens}</TokenList>;
};
