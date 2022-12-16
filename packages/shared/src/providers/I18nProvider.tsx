import React, {useMemo} from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

interface I18nProviderProps {
  children?: React.ReactNode;
}

export const LOCALE = 'en';

export const I18nProvider = ({children}: I18nProviderProps) => {
  const i18nManager = useMemo(() => {
    return new I18nManager({
      locale: LOCALE,
    });
  }, []);

  return (
    <I18nContext.Provider value={i18nManager}>{children}</I18nContext.Provider>
  );
};
