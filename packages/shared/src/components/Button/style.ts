import styled, {css} from 'styled-components';

import {ThemedCSS} from '../../types/theme';

import {Size} from './types';

const PrimaryButtonWrapper = css`
  background-color: ${({theme}) => theme.buttons.primary.background};
  border: ${({theme}) => theme.buttons.primary.border};
  border-radius: ${({theme}) => theme.buttons.primary.borderRadius};
  box-shadow: ${({theme}) => theme.buttons.primary.boxShadow};

  label {
    color: ${({theme}) => theme.buttons.primary.textColor};
  }

  &:hover {
    background-color: ${({theme}) => theme.buttons.primary.hover.background};
    box-shadow: ${({theme}) => theme.buttons.primary.hover.outline};
  }
`;

const SecondaryButtonWrapper = css`
  background-color: ${({theme}) => theme.buttons.secondary.background};
  border: ${({theme}) => theme.buttons.secondary.border};
  border-radius: ${({theme}) => theme.buttons.secondary.borderRadius};
  box-shadow: ${({theme}) => theme.buttons.secondary.boxShadow};

  label {
    color: ${({theme}) => theme.buttons.secondary.textColor};
  }

  &:hover {
    background-color: ${({theme}) => theme.buttons.secondary.hover.background};
    box-shadow: ${({theme}) => theme.buttons.secondary.hover.outline};
  }
`;

const DisabledButtonWrapper = css`
  cursor: default;
  background-color: ${({theme}) => theme.buttons.disabled.background};
  border: ${({theme}) => theme.buttons.disabled.background};

  label {
    color: ${({theme}) => theme.buttons.disabled.textColor};
  }

  &:hover {
    background-color: ${({theme}) => theme.buttons.disabled.background};
    box-shadow: unset;
  }
`;

const LargeButtonPadding = css`
  padding: ${({theme}) => theme.buttons.largePadding};
`;

const MediumButtonPadding = css`
  padding: ${({theme}) => theme.buttons.mediumPadding};
`;

const SmallButtonPadding = css`
  padding: ${({theme}) => theme.buttons.smallPadding};
`;

const PaddingMappedToSize: {[S in Size]: ThemedCSS} = {
  Lg: LargeButtonPadding,
  Md: MediumButtonPadding,
  Sm: SmallButtonPadding,
};

export const ButtonWrapper = styled.button<{
  primary?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size: Size;
}>`
  appearance: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;
  text-decoration: unset;
  width: ${({fullWidth}) => (fullWidth ? '100%' : 'fit-content')};
  ${({primary}) => (primary ? PrimaryButtonWrapper : SecondaryButtonWrapper)}
  ${({disabled}) => disabled && DisabledButtonWrapper}
  ${({size}) => PaddingMappedToSize[size]}

  label {
    cursor: inherit;
  }
`;
