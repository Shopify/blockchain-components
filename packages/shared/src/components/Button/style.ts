import styled, {css} from 'styled-components';

import {ThemedCSS} from '../../types/theme';

import {Size} from './types';

const PrimaryButtonWrapper = css`
  background-color: ${({theme}) => theme.buttons.variants.primary.background};
  border: ${({theme}) => theme.buttons.variants.primary.border};

  label {
    color: ${({theme}) => theme.buttons.variants.primary.textColor};
  }

  &:hover {
    background-color: ${({theme}) =>
      theme.buttons.variants.primary.hover.background};
    box-shadow: ${({theme}) => theme.buttons.variants.primary.hover.boxShadow};
  }
`;

const SecondaryButtonWrapper = css`
  background-color: ${({theme}) => theme.buttons.variants.secondary.background};
  border: ${({theme}) => theme.buttons.variants.secondary.border};

  label {
    color: ${({theme}) => theme.buttons.variants.secondary.textColor};
  }

  &:hover {
    background-color: ${({theme}) =>
      theme.buttons.variants.secondary.hover.background};
    box-shadow: ${({theme}) =>
      theme.buttons.variants.secondary.hover.boxShadow};
  }
`;

const DisabledButtonWrapper = css`
  cursor: default;
  background-color: ${({theme}) => theme.buttons.variants.disabled.background};
  border: ${({theme}) => theme.buttons.variants.disabled.border};

  label {
    color: ${({theme}) => theme.buttons.variants.disabled.textColor};
  }

  &:hover {
    background-color: ${({theme}) =>
      theme.buttons.variants.disabled.background};
    box-shadow: unset;
  }
`;

const LargeButton = css`
  border-radius: ${({theme}) => theme.buttons.sizes.large.borderRadius};
  padding: ${({theme}) => theme.buttons.sizes.large.padding};
`;

const MediumButton = css`
  border-radius: ${({theme}) => theme.buttons.sizes.medium.borderRadius};
  padding: ${({theme}) => theme.buttons.sizes.medium.padding};
`;

const SmallButton = css`
  border-radius: ${({theme}) => theme.buttons.sizes.small.borderRadius};
  padding: ${({theme}) => theme.buttons.sizes.small.padding};
`;

const SizeMap: {[S in Size]: ThemedCSS} = {
  Lg: LargeButton,
  Md: MediumButton,
  Sm: SmallButton,
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
  ${({size}) => SizeMap[size]}

  label {
    cursor: inherit;
  }
`;
