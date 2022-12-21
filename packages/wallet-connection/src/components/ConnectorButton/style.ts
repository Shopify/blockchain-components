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

export const ConnectorName = styled.label`
  font-weight: ${({theme}) => theme.typography.heading.fontWeight};
  font-size: ${({theme}) => theme.typography.heading.h3.fontSize};
  line-height: ${({theme}) => theme.typography.heading.h3.lineHeight};
  color: ${({theme}) => theme.typography.colorPrimary};
`;
