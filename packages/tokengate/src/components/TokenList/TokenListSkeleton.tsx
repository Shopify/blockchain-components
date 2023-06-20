import {SkeletonDisplayText, SkeletonThumbnail} from 'shared';

export const TokenListSkeleton = () => (
  <div className="sbc-relative">
    <div className="sbc-flex sbc-w-full sbc-flex-row sbc-items-center sbc-gap-x-3">
      <div className="sbc-relative sbc-h-12 sbc-w-12">
        <div className="sbc-h-full sbc-w-full sbc-overflow-hidden sbc-rounded-full">
          <SkeletonThumbnail />
        </div>
      </div>

      <div className="sbc-flex-grow">
        <SkeletonDisplayText />
      </div>
    </div>
  </div>
);
