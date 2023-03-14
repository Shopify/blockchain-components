import {SkeletonDisplayText, SkeletonThumbnail} from 'shared';

import {TokenBase} from '../TokenBase';

const TokenListSkeleton = ({round}: {round: boolean}) => (
  <TokenBase
    icon={<SkeletonThumbnail />}
    round={round}
    title={<SkeletonDisplayText />}
  />
);

export {TokenListSkeleton};
