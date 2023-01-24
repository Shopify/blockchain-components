import {useCallback, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {useConnect} from 'wagmi';
import {
  Back,
  Cancel,
  IconButton,
  QuestionMark,
  useKeyPress,
  Text,
} from 'shared';

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {useIsMounted} from '../../hooks/useIsMounted';
import {useTranslation} from '../../hooks/useTranslation';
import {ModalRoute, useModal} from '../../providers/ModalProvider';
import {ConnectionState} from '../../types/connectionState';

import {Background, Header, Sheet, Wrapper} from './style';
import {
  ConnectScreen,
  ConnectingScreen,
  GetAWalletScreen,
  ScanScreen,
  WhatAreWalletsScreen,
} from './Screens';

export const Modal = () => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connectors} = useDefaultConnectors();
  const {t} = useTranslation('Modal');
  const isMounted = useIsMounted();
  const {active, closeModal, navigation} = useModal();
  const [status, setStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );
  const escPress = useKeyPress('Escape');

  useEffect(() => {
    if (escPress && active) {
      closeModal();
    }
  }, [active, closeModal, escPress]);

  const handleBackdropPress = useCallback(() => {
    if (!active) return;

    closeModal();
  }, [active, closeModal]);

  const {connect} = useConnect({
    onMutate: ({connector}) => {
      if (connector.ready) {
        setStatus(ConnectionState.Connecting);
      } else {
        setStatus(ConnectionState.Unavailable);
      }
    },
    onSettled: (data, error) => {
      if (error) {
        if (error.message === 'User rejected request') {
          setStatus(ConnectionState.Rejected);
          return;
        }

        if (error.message !== 'Connector already connected') {
          setStatus(ConnectionState.Failed);
          console.error(
            `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
          );
          return;
        }
      }

      if (data) {
        setStatus(ConnectionState.Connected);

        // Close the modal if the connection is successful
        setTimeout(() => {
          closeModal();
        }, 500);
      }
    },
  });

  const headerTitle = useMemo(() => {
    const {route} = navigation;

    const routeTitlesDict: {[R in ModalRoute]: string} = {
      Connect: t('title.Connect'),
      Connecting: t('title.Connecting'),
      GetAWallet: t('title.GetAWallet'),
      Scan: t('title.Scan'),
      WhatAreWallets: t('title.WhatAreWallets'),
    };

    const screenTitle = routeTitlesDict[route];

    if (route === ModalRoute.Connecting || route === ModalRoute.Scan) {
      return `${screenTitle} ${pendingConnector?.name}`;
    }

    return screenTitle;
  }, [navigation, pendingConnector?.name, t]);

  const screenComponent = useMemo(() => {
    switch (navigation.route) {
      case ModalRoute.Connect:
        return <ConnectScreen connect={connect} connectors={connectors} />;

      case ModalRoute.Connecting:
        return <ConnectingScreen connect={connect} state={status} />;

      case ModalRoute.GetAWallet:
        return <GetAWalletScreen />;

      case ModalRoute.Scan:
        return <ScanScreen connect={connect} />;

      case ModalRoute.WhatAreWallets:
        return <WhatAreWalletsScreen />;

      default:
        return null;
    }
  }, [connect, connectors, navigation.route, status]);

  const titleLeftButton = useMemo(() => {
    if (navigation.goBack) {
      return (
        <IconButton
          aria-label={t('icons.back') as string}
          icon={Back}
          onClick={navigation.goBack}
        />
      );
    }

    return (
      <IconButton
        aria-label={t('icons.whatIsAWallet') as string}
        icon={QuestionMark}
        onClick={() => navigation.navigate(ModalRoute.WhatAreWallets)}
      />
    );
  }, [navigation, t]);

  if (!active || !isMounted) {
    return null;
  }

  return createPortal(
    <Wrapper id="shopify-connect-wallet-modal-container">
      <Background onClick={handleBackdropPress} />
      <Sheet>
        <Header>
          {titleLeftButton}

          <Text as="h2" variant="headingMd">
            {headerTitle}
          </Text>

          <IconButton
            aria-label={t('icons.close') as string}
            icon={Cancel}
            onClick={closeModal}
          />
        </Header>

        {screenComponent}
      </Sheet>
    </Wrapper>,
    document.body,
  );
};
