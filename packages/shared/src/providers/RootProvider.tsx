import {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {AvailableThemes} from '../themes';
import {ThemeProps} from '../types/theme';
import {SharedStyles} from '../styles/sharedStyles';

import {I18nProvider} from './I18nProvider';

export const RootProvider: FC<ThemeProps> = ({children, theme = 'Dawn'}) => {
  const providedTheme =
    typeof theme === 'string' ? AvailableThemes[theme] : theme;

  return (
    <I18nProvider>
      <StyledThemeProvider theme={providedTheme}>
        <SharedStyles>{children}</SharedStyles>
      </StyledThemeProvider>
    </I18nProvider>
  );
};
