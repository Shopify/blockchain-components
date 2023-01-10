import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  padding: ${({theme}) => theme.walletConnectorButton.padding};
  background: ${({theme}) => theme.walletConnectorButton.background};
  border: ${({theme}) => theme.walletConnectorButton.border};
  border-radius: ${({theme}) => theme.walletConnectorButton.borderRadius};
  box-shadow: ${({theme}) => theme.walletConnectorButton.boxShadow};
  justify-content: ${({theme}) =>
    theme.walletConnectorButton.horizontalAlignment};

  &:hover {
    background: ${({theme}) => theme.walletConnectorButton.hover.background};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;
