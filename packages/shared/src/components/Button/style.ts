import styled, {css} from 'styled-components';

export const PrimaryButtonWrapper = css`
  background: ${({theme}) => theme.connectButton.background};
  border: ${({theme}) => theme.connectButton.border};
  border-radius: ${({theme}) => theme.connectButton.borderRadius};
  color: ${({theme}) => theme.connectButton.textColor};
  padding: ${({theme}) => theme.connectButton.padding};
  box-shadow: ${({theme}) => theme.connectButton.boxShadow};

  &:hover {
    background: ${({theme}) => theme.connectButton.backgroundHover};
  }
`;

export const SecondaryButtonWrapper = css`
  background: ${({theme}) => theme.secondaryButton.background};
  border: ${({theme}) => theme.secondaryButton.border};
  border-radius: ${({theme}) => theme.secondaryButton.borderRadius};
  color: ${({theme}) => theme.secondaryButton.textColor};
  padding: ${({theme}) => theme.secondaryButton.padding};
  box-shadow: ${({theme}) => theme.secondaryButton.boxShadow};

  &:hover {
    background: ${({theme}) => theme.secondaryButton.backgroundHover};
  }
`;

export const ButtonWrapper = styled.button<{
  primary?: Boolean;
  fullWidth?: Boolean;
}>`
  ${({primary}) => (primary ? PrimaryButtonWrapper : SecondaryButtonWrapper)}
  font-weight: ${({theme}) => theme.typography.heading.fontWeight};
  font-size: ${({theme}) => theme.typography.heading.h3.fontSize};
  line-height: ${({theme}) => theme.typography.heading.h3.lineHeight};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing};
  width: ${({fullWidth}) => (fullWidth ? '100%' : 'auto')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;
`;

export const LinkButton = styled.a`
  padding: 0px;
  text-decoration: none;

  button {
    width: 100%;
  }
`;
