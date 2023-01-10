import {useTheme} from 'styled-components';

import {Wrapper} from './style';
import {Color, TextProps} from './types';

export const Text = ({
  as,
  children,
  color = 'primary',
  variant = 'body',
}: TextProps) => {
  const {colorCritical, colorInteractive, colorPrimary, colorSecondary} =
    useTheme().typography;

  const colorMappedToThemeColor: {[C in Color]: string} = {
    critical: colorCritical,
    interactive: colorInteractive,
    primary: colorPrimary,
    secondary: colorSecondary,
  };

  return (
    <Wrapper as={as} color={colorMappedToThemeColor[color]} variant={variant}>
      {children}
    </Wrapper>
  );
};
