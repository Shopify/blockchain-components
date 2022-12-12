import {Fragment} from 'react';
import {TokenBase} from '../TokenBase/TokenBase';
import {TokenListImage} from './TokenListImage';
import {TokenListSkeleton} from './TokenListSkeleton';
import {TokenListWrapper} from './style';
import {TokenListProps} from './types';

const TokenList = ({tokens, separator, isLoading}: TokenListProps) => {
  if (isLoading) {
    return <TokenListSkeleton round />;
  }

  return (
    <TokenListWrapper>
      {tokens?.map(({title, subtitle, imageUrl, badge, round}, index) => {
        return (
          <Fragment key={title}>
            <TokenBase
              title={title}
              subtitle={subtitle}
              round={Boolean(round)}
              icon={<TokenListImage imageUrl={imageUrl} alt={title} />}
              badge={badge}
            />
            {index < tokens.length - 1 && separator}
          </Fragment>
        );
      })}
    </TokenListWrapper>
  );
};

export {TokenList};
