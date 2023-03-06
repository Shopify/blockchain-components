import React from 'react';
import {RootProvider, Theme, ThemeProps} from 'shared';

type ThemeProviderProps = Omit<ThemeProps, 'children'>;
type ThemeType = Exclude<ThemeProviderProps['theme'], Theme>;

const getTheme = (themeName: string): ThemeType => {
  if (themeName === 'Dawn' || themeName === 'Default') {
    return themeName;
  }

  return 'Default';
};

export const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme);

  return (
    <RootProvider theme={theme}>
      <Story />
    </RootProvider>
  );
};
