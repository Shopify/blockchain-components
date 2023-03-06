import {CSSProperties} from 'react';
import {styled} from 'shared';

export const Circle = styled.circle`
  fill: ${({theme}) => theme.typography.colorPrimary};
`;

export const Container = styled.div<{
  $aspectRatio?: CSSProperties['aspectRatio'];
}>`
  width: 100%;
  aspect-ratio: ${({$aspectRatio}) => $aspectRatio};
  border-radius: 16px;
  border: ${({theme}) => theme.buttons.variants.secondary.border};
  padding: 16px;
  position: relative;
  box-sizing: border-box;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 76px;
    height: 76px;
  }
`;

export const Rect = styled.rect<{$isForeground: boolean}>`
  fill: ${({$isForeground, theme}) =>
    $isForeground ? theme.typography.colorPrimary : theme.modal.background};
`;
