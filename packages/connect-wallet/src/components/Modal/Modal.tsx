import {useCallback, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {useConnect} from 'wagmi';
import {useI18n} from '@shopify/react-i18n';
import {ArrowLeft, Cancel, IconButton, QuestionMark, Text} from 'shared';

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {useIsMounted} from '../../hooks/useIsMounted';
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
  const [i18n] = useI18n();
  const isMounted = useIsMounted();
  const {active, closeModal, navigation} = useModal();
  const [status, setStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );

  const screenTitle = i18n.translate(navigation.route, {
    scope: 'Modal.title',
  });

  const handleBackdropPress = useCallback(() => {
    if (!active) return;

    closeModal();
  }, [active, closeModal]);

  const {connect} = useConnect({
    onError: (error) => {
      setStatus(ConnectionState.Failed);
      console.error(
        `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
      );
    },
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

        if (error.message === 'Connector already connected') {
          setStatus(ConnectionState.AlreadyConnected);
          return;
        }

        setStatus(ConnectionState.Failed);
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

    if (route === ModalRoute.Connecting || route === ModalRoute.Scan) {
      return `${screenTitle} ${pendingConnector?.name}`;
    }

    return screenTitle;
  }, [navigation, pendingConnector?.name, screenTitle]);

  const screenComponent = useMemo(() => {
    switch (navigation.route) {
      case ModalRoute.Connect:
        return <ConnectScreen connect={connect} connectors={connectors} />;

      case ModalRoute.Connecting:
        return <ConnectingScreen connect={connect} state={status} />;

      case ModalRoute.GetAWallet:
        return <GetAWalletScreen />;

      case ModalRoute.Scan:
        return <ScanScreen connect={connect} state={status} />;

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
          aria-label={i18n.translate('Modal.icons.back')}
          icon={ArrowLeft}
          onClick={navigation.goBack}
        />
      );
    }

    return (
      <IconButton
        aria-label={i18n.translate('Modal.icons.whatIsAWallet')}
        icon={QuestionMark}
        onClick={() => navigation.navigate(ModalRoute.WhatAreWallets)}
      />
    );
  }, [i18n, navigation]);

  if (!active || !isMounted) {
    return null;
  }

  return createPortal(
    <Wrapper>
      <Background onClick={handleBackdropPress} />
      <Sheet>
        <Header>
          {titleLeftButton}

          <Text as="h2" variant="headingMd">
            {headerTitle}
          </Text>

          <IconButton
            aria-label={i18n.translate('Modal.icons.close')}
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
