import {ReactNode} from 'react';

import {TokenListSkeleton} from './TokenListSkeleton';

interface TokenListProps {
  children: ReactNode;
  isLoading?: boolean;
  separator?: boolean;
}

export const TokenList = ({children, isLoading, separator}: TokenListProps) => {
  return (
    <div
      className={`sbc-flex sbc-flex-col sbc-py-5${
        separator ? '' : ' sbc-gap-y-3'
      }`}
    >
      {isLoading ? <TokenListSkeleton /> : children}
    </div>
  );
};
