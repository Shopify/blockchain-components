import {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {AvailableThemes} from '../themes';
import {ThemeProps} from '../types/theme';
import {GlobalStyles} from '../styles/globalStyles';

import {I18nProvider} from './I18nProvider';

export const RootProvider: FC<ThemeProps> = ({
  children,
  customTheme,
  theme = 'Dawn',
}) => {
  const providedTheme = AvailableThemes[theme];

  return (
    <I18nProvider>
      <StyledThemeProvider theme={customTheme || providedTheme}>
        <GlobalStyles>{children}</GlobalStyles>
      </StyledThemeProvider>
    </I18nProvider>
  );
};
