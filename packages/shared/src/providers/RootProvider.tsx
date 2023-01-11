import {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {AvailableThemes} from '../themes';
import {ThemeProps} from '../types/theme';
import {GlobalStyles} from '../styles/globalStyles';

import {I18nProvider} from './I18nProvider';

export const RootProvider: FC<ThemeProps> = ({children, theme = 'Dawn'}) => {
  const providedTheme =
    typeof theme === 'string' ? AvailableThemes[theme] : theme;

  return (
    <I18nProvider>
      <StyledThemeProvider theme={providedTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </I18nProvider>
  );
};
