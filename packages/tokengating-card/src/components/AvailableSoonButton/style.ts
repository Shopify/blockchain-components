import {ButtonWrapper, ButtonText} from 'shared/src/components/Button/style';
import styled from 'styled-components';

export const AvailableSoonButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.availableSoonButton.background};
  border: ${({theme}) => theme.availableSoonButton.border};
`;

// Hardcoded since none of the Dawn colors match the font color specified in the Figma
export const AvailableSoonButtonText = styled(ButtonText)`
  color: #656565;
`;
