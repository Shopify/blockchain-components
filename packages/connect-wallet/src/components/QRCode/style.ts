import styled from 'styled-components';

export const Circle = styled.circle`
  fill: ${({theme}) => theme.typography.colorPrimary};
`;

export const Container = styled.div`
  max-width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  border: ${({theme}) => theme.walletConnectorButton.border};
  padding: 16px;
  position: relative;
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
