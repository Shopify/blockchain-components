import {Fragment} from 'react';

import {TokenBase} from '../TokenBase';

import {TokenListImage} from './TokenListImage';
import {TokenListSkeleton} from './TokenListSkeleton';
import {TokenListProps} from './types';

export const TokenList = ({isLoading, separator, tokens}: TokenListProps) => {
  const content = isLoading ? (
    <TokenListSkeleton round />
  ) : (
    tokens?.map((props, index) => (
      <Fragment key={props.title}>
        <TokenBase
          {...props}
          icon={<TokenListImage imageUrl={props.imageUrl} alt={props.title} />}
          round={Boolean(props.round)}
        />
        {index < tokens.length - 1 ? separator : null}
      </Fragment>
    ))
  );

  return (
    <div
      className={`sbc-flex sbc-flex-col sbc-py-5${
        separator ? '' : ' sbc-gap-y-3'
      }`}
    >
      {content}
    </div>
  );
};
