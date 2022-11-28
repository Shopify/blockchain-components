import {ButtonWrapper, ButtonText} from 'shared/src/components/Button/style';
import styled from 'styled-components';

export const ConnectedWalletButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.walletConnectorButton.background};
  border: 1px solid black;
`;

export const ConnectedWalletIcon = styled.div`
  height: 20px;
  width: 20px;
  background-color: blue;
  margin-right: 5px;
`;

export const ConnectedWalletButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.walletConnectorButton.textColor};
`;
