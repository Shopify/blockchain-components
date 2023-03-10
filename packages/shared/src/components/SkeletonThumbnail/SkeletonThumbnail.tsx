import {ClassName} from '../../types/generic';

// export const SkeletonThumbnail = styled.div<{size?: number}>`
//   background-color: #e4e5e7;
//   width: ${(props) => (props.size ? `${props.size}px` : '100%')};
//   height: ${(props) => (props.size ? `${props.size}px` : '100%')};
// `;

export const SkeletonThumbnail = ({size}: {size?: number}) => {
  const dimensions: ClassName = size
    ? `sbc-w-[${size}px] sbc-h-[${size}px]`
    : 'sbc-w-full sbc-h-full';

  return <div className={`sbc-bg-skeleton ${dimensions}`} />;
};
