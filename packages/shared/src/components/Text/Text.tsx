import {useTheme} from 'styled-components';

import {Wrapper} from './style';
import {Color, TextProps} from './types';

export const Text = ({
  as,
  bold,
  children,
  color = 'primary',
  variant = 'bodyMd',
}: TextProps) => {
  const {colorCritical, colorDisabled, colorPrimary, colorSecondary} =
    useTheme().typography;

  const colorMappedToThemeColor: {[C in Color]: string} = {
    critical: colorCritical,
    disabled: colorDisabled,
    primary: colorPrimary,
    secondary: colorSecondary,
  };

  return (
    <Wrapper
      as={as}
      color={colorMappedToThemeColor[color]}
      variant={variant}
      $bold={bold}
    >
      {children}
    </Wrapper>
  );
};
