import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

/**
 * English translations
 */
import Buttons from './translations/en/Buttons.json';
import Link from './translations/en/Link.json';
import Tokengate from './translations/en/Tokengate.json';
import TokengateRequirements from './translations/en/TokengateRequirements.json';

const i18n = createInstance({
  fallbackLng: 'en',
  // Only enable the debug flag in development environments.
  // eslint-disable-next-line no-process-env
  debug: process.env.NODE_ENV === 'development',

  resources: {
    en: {
      Buttons,
      Link,
      Tokengate,
      TokengateRequirements,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
