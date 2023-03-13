import {withThemeProvider} from './decorators';

import '@shopify/connect-wallet/styles.css';
import '@shopify/tokengate/styles.css';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withThemeProvider];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Components theme',
    defaultValue: 'Default',
    toolbar: {
      icon: 'paintbrush',
      items: ['Dawn', 'Default'],
      showName: true,
      dynamicTitle: true,
    },
  },
};
