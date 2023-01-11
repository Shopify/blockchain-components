import React from 'react';
import {ThemeProvider} from 'styled-components';
import {withThemes} from '@react-theming/storybook-addon';
import {Dawn, Polaris} from 'shared';

const providerFn = ({theme, children}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const withThemeProvider = (withThemes as any)(null, [Dawn, Polaris], {
  providerFn,
});