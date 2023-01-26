import {SkeletonThumbnail} from 'shared';

import {TokenListImageStyle} from './style';

const TokenListImage = ({alt, imageUrl}: {alt: string; imageUrl?: string}) => {
  if (!imageUrl) {
    return <SkeletonThumbnail />;
  }
  return <TokenListImageStyle src={imageUrl} alt={alt} />;
};
export {TokenListImage};
