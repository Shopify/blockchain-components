import {ThemeProvider} from 'styled-components';

import {Polaris} from '../../themes/polaris';

export const PolarisThemeProvider = ({children}: {children: any}) => {
  return <ThemeProvider theme={Polaris}>{children}</ThemeProvider>;
};
