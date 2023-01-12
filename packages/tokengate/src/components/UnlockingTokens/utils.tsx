import {UnlockingToken} from 'types';

import {TokenListProps} from '../TokenList';

import {OrderLimit} from './OrderLimit';

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
    rightContent: <OrderLimit {...unlockingToken.token} />,
  }));
