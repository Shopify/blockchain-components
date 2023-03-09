import {Fragment} from 'react';

import {TokenBase} from '../TokenBase';

import {TokenListWrapper} from './style';
import {TokenListImage} from './TokenListImage';
import {TokenListSkeleton} from './TokenListSkeleton';
import {TokenListProps} from './types';

const TokenList = ({tokens, separator, isLoading}: TokenListProps) => {
  if (isLoading) {
    return (
      <TokenListWrapper>
        <TokenListSkeleton round />
      </TokenListWrapper>
    );
  }

  return (
    <TokenListWrapper>
      {tokens?.map(
        (
          {
            title,
            subtitle,
            imageUrl,
            badge,
            round,
            rightContent,
            links,
            isUnlocked,
          },
          index,
        ) => {
          return (
            <Fragment key={title}>
              <TokenBase
                title={title}
                subtitle={subtitle}
                round={Boolean(round)}
                icon={<TokenListImage imageUrl={imageUrl} alt={title} />}
                badge={badge}
                rightContent={rightContent}
                isUnlocked={isUnlocked}
                links={links}
              />
              {index < tokens.length - 1 ? separator : null}
            </Fragment>
          );
        },
      )}
    </TokenListWrapper>
  );
};

export {TokenList};
