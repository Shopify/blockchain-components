import {AvailableThemes} from '../themes';
import {FC} from 'react';
import {I18nProvider} from './I18nProvider';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {ThemeProps} from '../types/theme';

export const RootProvider: FC<ThemeProps> = ({
  children,
  customTheme,
  theme = 'Dawn',
}) => {
  const providedTheme = AvailableThemes[theme];

  return (
    <I18nProvider>
      <StyledThemeProvider theme={customTheme || providedTheme}>
        {children}
      </StyledThemeProvider>
    </I18nProvider>
  );
};
