import React from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

interface I18nProviderProps {
  children?: React.ReactNode;
}

export const LOCALE = 'en';

const i18nManager = new I18nManager({
  locale: LOCALE,
});

export const I18nProvider = ({children}: I18nProviderProps) => {
  return (
    <I18nContext.Provider value={i18nManager}>{children}</I18nContext.Provider>
  );
};
