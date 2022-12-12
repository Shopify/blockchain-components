import {SkeletonThumbnail, SkeletonDisplayText} from 'shared/src';
import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseText,
  TokenBaseIconWrapper,
} from './style';

const TokenBaseSkeleton = ({round}: {round: boolean}) => (
  <TokenBaseStyle>
    <TokenBaseIconWrapper>
      <TokenBaseIcon round={round}>
        <SkeletonThumbnail />
      </TokenBaseIcon>
    </TokenBaseIconWrapper>
    <TokenBaseText>
      <SkeletonDisplayText />
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBaseSkeleton};
