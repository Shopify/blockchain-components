import {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {AvailableThemes} from '../themes';
import {ThemeProps} from '../types/theme';
import {GlobalStyles} from '../styles/sharedStyles';

export const RootProvider: FC<ThemeProps> = ({children, theme = 'Default'}) => {
  const providedTheme =
    typeof theme === 'string' ? AvailableThemes[theme] : theme;

  return (
    <StyledThemeProvider theme={providedTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
