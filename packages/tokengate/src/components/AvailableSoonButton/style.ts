import {ButtonWrapper} from 'shared/src/components/Button/style';
import styled from 'styled-components';

// Hardcoded color since none of the Dawn colors match the font color specified in the Figma
export const AvailableSoonButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.connectButton.background};
  color: #656565;
`;
