import { ButtonStyle, ButtonText } from 'shared/src/components/Button/style';
import styled from 'styled-components';

export const ConnectWalletButtonStyle = styled(ButtonStyle)`
  background-color: ${({theme}) => theme.connectButton.background};
  border: none;
`;

export const ConnectWalletButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.connectButton.textColor};
`;