import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

/**
 * English translations
 */
import ConnectButton from './translations/en/ConnectButton.json';
import ConnectorButton from './translations/en/ConnectorButton.json';
import ConnectScreen from './translations/en/ConnectScreen.json';
import GetAConnectorButton from './translations/en/GetAConnectorButton.json';
import Modal from './translations/en/Modal.json';
import Screens from './translations/en/Screens.json';
import UseModalContent from './translations/en/UseModalContent.json';
import VaultList from './translations/en/VaultList.json';

const i18n = createInstance({
  fallbackLng: 'en',
  // Only enable the debug flag in development environments.
  // eslint-disable-next-line no-process-env
  debug: process.env.NODE_ENV === 'development',

  resources: {
    en: {
      ConnectButton,
      ConnectorButton,
      ConnectScreen,
      GetAConnectorButton,
      Modal,
      Screens,
      UseModalContent,
      VaultList,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
