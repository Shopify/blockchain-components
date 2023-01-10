import React from 'react';
import {I18nProvider} from 'shared';

export const withI18nProvider = (Story) => (
  <I18nProvider>
    <Story />
  </I18nProvider>
);
