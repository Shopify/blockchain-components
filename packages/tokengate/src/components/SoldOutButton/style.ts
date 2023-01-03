import {ButtonWrapper} from 'shared/src/components/Button/style';
import styled from 'styled-components';

// Hardcoded since none of the Dawn colors match the font color specified in the Figma
export const SoldOutButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.soldOutButton.background};
  border: ${({theme}) => theme.soldOutButton.border};
  border-color: #888888;
  color: #888888;
`;

export const SoldOutButtonDescriptionStyle = styled.p`
  font-weight: ${({theme}) => theme.typography.body.fontWeight};
  font-size: ${({theme}) => theme.typography.body.fontSize};
  line-height: ${({theme}) => theme.typography.body.lineHeight};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing};
  cursor: pointer;
  color: ${({theme}) => theme.soldOutButton.textColor};
  margin: 4px 0;
`;
