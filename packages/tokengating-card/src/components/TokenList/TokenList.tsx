import {Fragment} from 'react';
import {UnlockingToken, TokenSeriesWithBadge} from '../TokengatingCard/types';
import {TokenBase} from '../TokenBase/TokenBase';
import {TokenListImage} from './TokenListImage';
import {TokenListWrapper} from './style';
import {getTokenInfo} from './utils';

const TokenList = ({
  tokens,
  separator,
}: {
  tokens?: (UnlockingToken | TokenSeriesWithBadge)[];
  separator?: React.ReactElement;
}) => (
  <TokenListWrapper>
    {tokens?.map((token, index) => {
      const {title, subtitle, imageUrl, round, badge} = getTokenInfo(token);
      return (
        <Fragment key={title}>
          <TokenBase
            title={title}
            subtitle={subtitle}
            round={round}
            icon={<TokenListImage imageUrl={imageUrl} alt={title} />}
            badge={badge}
          />
          {index < tokens.length - 1 && separator}
        </Fragment>
      );
    })}
  </TokenListWrapper>
);

export {TokenList};
