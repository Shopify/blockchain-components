import {SkeletonThumbnail, SkeletonDisplayText} from 'shared';

import {TokenBaseStyle, TokenBaseIcon, TokenBaseText} from './style';

const TokenBaseSkeleton = ({round}: {round: boolean}) => (
  <TokenBaseStyle>
    <TokenBaseIcon round={round}>
      <SkeletonThumbnail />
    </TokenBaseIcon>
    <TokenBaseText>
      <SkeletonDisplayText />
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBaseSkeleton};
