import {ButtonWrapper} from 'shared/src/components/Button/style';
import styled from 'styled-components';

export const ConnectedWalletButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.walletConnectorButton.background};
  border: ${({theme}) => theme.walletConnectorButton.border};
  color: ${({theme}) => theme.walletConnectorButton.textColor};
  width: 100%;

  &:hover {
    outline: ${({theme}) => theme.walletConnectorButton.hover.outline};
  }
`;

export const ConnectedWalletIcon = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 5px;
  border-radius: 4px;
`;

export const ConnectedWalletDropdown = styled.div`
  margin-left: 5px;
  display: flex;
`;

export const ConnectedWalletAddress = styled.span`
  max-width: calc(100% - 50px);
  overflow: hidden;
`;
