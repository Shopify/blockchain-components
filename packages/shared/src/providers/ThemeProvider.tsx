import {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {AvailableThemes} from '../themes';
import {ThemeProps} from '../types/theme';

export const ThemeProvider: FC<ThemeProps> = ({
  children,
  customTheme,
  theme = 'Polaris',
}) => {
  const providedTheme = AvailableThemes[theme];

  return (
    <StyledThemeProvider theme={customTheme || providedTheme}>
      {children}
    </StyledThemeProvider>
  );
};
