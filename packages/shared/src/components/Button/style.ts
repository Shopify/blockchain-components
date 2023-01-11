import styled, {css} from 'styled-components';

export const PrimaryButtonWrapper = css`
  background: ${({theme}) => theme.connectButton.background};
  border: ${({theme}) => theme.connectButton.border};
  border-radius: ${({theme}) => theme.connectButton.borderRadius};
  color: ${({theme}) => theme.connectButton.textColor};
  padding: ${({theme}) => theme.connectButton.padding};
  box-shadow: ${({theme}) => theme.connectButton.boxShadow};

  &:hover {
    outline: ${({theme}) => theme.connectButton.hover.outline};
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
    outline: ${({theme}) => theme.secondaryButton.hover.outline};
  }
`;

export const DisabledButtonWrapper = css`
  cursor: default;
  background: ${({theme}) => theme.disabledButton.background};
  border: ${({theme}) => theme.disabledButton.background};
  color: ${({theme}) => theme.disabledButton.textColor};

  &:hover {
    outline: none;
  }
`;

export const ButtonWrapper = styled.button<{
  primary?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}>`
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
  ${({primary}) => (primary ? PrimaryButtonWrapper : SecondaryButtonWrapper)}
  ${({disabled}) => (disabled ? DisabledButtonWrapper : {})}
`;

export const LinkButton = styled.a`
  padding: 0px;
  text-decoration: none;

  button {
    width: 100%;
  }
`;
