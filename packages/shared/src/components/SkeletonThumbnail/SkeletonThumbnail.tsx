import styled from 'styled-components';

export const SkeletonThumbnail = styled.div<{size?: number}>`
  display: block !important;
  background-color: #e4e5e7;
  width: ${(props) => (props.size ? `${props.size}px` : '100%')};
  height: ${(props) => (props.size ? `${props.size}px` : '100%')};
`;
