import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import {useWalletConnection} from './WalletConnectionProvider';
import {Modal} from '../components/Modal';

export enum ModalRoute {
  Connect = 'Connect',
  WhatAreWallets = 'WhatAreWallets',
  Connecting = 'Connecting',
  Scan = 'Scan',
}

export interface ModalProviderValue {
  active: boolean;
  closeModal: () => void;
  navigation: {
    goBack?: () => void;
    navigate: (route: ModalRoute) => void;
    route: ModalRoute;
  };
  showModal: () => void;
}

const defaultState: ModalProviderValue = {
  active: false,
  closeModal: () => {},
  navigation: {
    navigate: () => {},
    route: ModalRoute.Connect,
  },
  showModal: () => {},
};

export const ModalContext = createContext<ModalProviderValue>(defaultState);

export const ModalProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {pendingConnector, setPendingConnector} = useWalletConnection();

  const [active, setActive] = useState(false);
  const [route, setRoute] = useState(ModalRoute.Connect);
  const [history, setHistory] = useState<ModalRoute[]>([]);

  const handleNavigate = useCallback(
    (screenName: ModalRoute) => {
      setHistory([...history, screenName]);
      setRoute(screenName);
    },
    [history],
  );

  const handleGoBack = useCallback(() => {
    if (history.length) {
      const newHistory = history.slice(0, history.length - 1);

      /**
       * If the new history contains more than one entry, we can
       * use the last entry in the history array as our new screen.
       * Otherwise, we go back to the first screen,
       */
      const newScreen = newHistory.length
        ? newHistory[newHistory.length - 1]
        : ModalRoute.Connect;

      setHistory(newHistory);
      setRoute(newScreen);
      return;
    }

    return undefined;
  }, [history]);

  const handleCloseModal = useCallback(() => {
    // Clear the pending connector
    if (pendingConnector) {
      setPendingConnector(undefined);
    }

    setActive(false);
    setHistory([]);
    setRoute(ModalRoute.Connect);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        active,
        closeModal: handleCloseModal,
        navigation: {
          goBack: history.length ? handleGoBack : undefined,
          navigate: handleNavigate,
          route,
        },
        showModal: () => setActive(true),
      }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw Error('ModalProvider not present.');
  return context;
};
