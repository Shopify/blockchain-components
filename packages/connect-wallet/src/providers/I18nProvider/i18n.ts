import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

/**
 * English translations
 */
import ConnectButton from './translations/en/ConnectButton.json';
import ConnectorButton from './translations/en/ConnectorButton.json';
import GetAConnectorButton from './translations/en/GetAConnectorButton.json';
import Modal from './translations/en/Modal.json';
import Screens from './translations/en/Screens.json';
import UseConnectorDownloadLinks from './translations/en/UseConnectorDownloadLinks.json';
import UseModalContent from './translations/en/UseModalContent.json';

const i18n = createInstance({
  fallbackLng: 'en',
  debug: true,

  resources: {
    en: {
      ConnectButton,
      ConnectorButton,
      GetAConnectorButton,
      Modal,
      Screens,
      UseConnectorDownloadLinks,
      UseModalContent,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
