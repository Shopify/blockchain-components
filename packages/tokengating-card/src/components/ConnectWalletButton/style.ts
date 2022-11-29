import {ButtonWrapper} from 'shared/src/components/Button/style';
import styled from 'styled-components';

export const ConnectWalletButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.connectButton.background};
  color: ${({theme}) => theme.connectButton.textColor};
  border: none;
`;
