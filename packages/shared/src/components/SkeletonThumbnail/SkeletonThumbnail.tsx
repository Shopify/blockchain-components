import {ClassName} from '../../types/generic';

export const SkeletonThumbnail = ({size}: {size?: number}) => {
  const dimensions: ClassName = size
    ? `sbc-w-[${size}px] sbc-h-[${size}px]`
    : 'sbc-w-full sbc-h-full';

  return <div className={`sbc-animate-pulse sbc-bg-skeleton ${dimensions}`} />;
};
