import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

/**
 * English translations
 */
import AvailableSoonButton from './translations/en/AvailableSoonButton.json';
import Link from './translations/en/Link.json';
import SoldOutButton from './translations/en/SoldOutButton.json';
import Tokengate from './translations/en/Tokengate.json';
import TokengateRequirements from './translations/en/TokengateRequirements.json';

const i18n = createInstance({
  fallbackLng: 'en',
  debug: true,

  resources: {
    en: {
      AvailableSoonButton,
      Link,
      SoldOutButton,
      Tokengate,
      TokengateRequirements,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
