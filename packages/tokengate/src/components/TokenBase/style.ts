import {SkeletonThumbnail, styled} from '@shopify/blockchain-components';

export const TokenBaseStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
  width: 100%;
  padding: 12px 0;
  box-sizing: unset;
`;

export const TokenBaseIcon = styled.div<{round: boolean}>`
  height: 48px;
  width: 48px;
  position: relative;

  img,
  ${SkeletonThumbnail} {
    height: inherit;
    width: inherit;
    border-radius: ${(props) => (props.round ? '50%' : '4px')};
    overflow: hidden;
  }
`;

export const TokenBaseBadge = styled.div`
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

export const TokenBaseText = styled.div`
  flex-grow: 1;

  p {
    margin: unset;
    text-transform: capitalize;
  }
`;
