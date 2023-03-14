import {Fragment} from 'react';

import {TokenBase} from '../TokenBase';

import {TokenListImage} from './TokenListImage';
import {TokenListSkeleton} from './TokenListSkeleton';
import {TokenListProps} from './types';

const TokenList = ({tokens, separator, isLoading}: TokenListProps) => {
  const content = isLoading ? (
    <TokenListSkeleton round />
  ) : (
    tokens?.map(
      ({title, subtitle, imageUrl, badge, round, rightContent}, index) => (
        <Fragment key={title}>
          <TokenBase
            title={title}
            subtitle={subtitle}
            round={Boolean(round)}
            icon={<TokenListImage imageUrl={imageUrl} alt={title} />}
            badge={badge}
            rightContent={rightContent}
          />
          {index < tokens.length - 1 ? separator : null}
        </Fragment>
      ),
    )
  );

  return <div className="sbc-py-2">{content}</div>;
};

export {TokenList};
