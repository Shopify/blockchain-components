import {ButtonWrapper, ButtonText} from 'shared/src/components/Button/style';
import styled from 'styled-components';

// Hardcoded since none of the Dawn colors match the font color specified in the Figma
export const SoldOutButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.soldOutButton.background};
  border: ${({theme}) => theme.soldOutButton.border};
  border-color: #888888;
`;

export const SoldOutButtonTextStyle = styled(ButtonText)`
  color: #888888;
`;

export const SoldOutButtonDescriptionStyle = styled(ButtonText)`
  textcolor: ${({theme}) => theme.soldOutButton.textColor};
  font-size: 14px;
  margin: 4px 0;
`;
