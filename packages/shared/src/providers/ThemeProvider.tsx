import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {Polaris} from '../themes';

export const ThemeProvider = ({children}: {children: any}) => {
  return <StyledThemeProvider theme={Polaris}>{children}</StyledThemeProvider>;
};
