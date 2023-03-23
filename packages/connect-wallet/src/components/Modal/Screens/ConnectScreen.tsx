import {useCallback} from 'react';
import {Text, DelegateCash} from 'shared';

import {ConnectorButton} from '../../ConnectorButton';
import {useAppDispatch} from '../../../hooks/useAppState';
import {useConnect} from '../../../hooks/useConnect';
import {useTranslation} from '../../../hooks/useTranslation';
import {useWalletConnectDeeplink} from '../../../hooks/useWalletConnectDeeplink';
import {closeModal, navigate} from '../../../slices/modalSlice';
import {setPendingConnector} from '../../../slices/walletSlice';
import {Connector} from '../../../types/connector';
import {getBrowserInfo} from '../../../utils/getBrowser';
import {isInstalled} from '../../../utils/isInstalled';

interface ConnectScreenProps {
  connectors: Connector[];
}

const ConnectScreen = ({connectors}: ConnectScreenProps) => {
  const dispatch = useAppDispatch();
  const {connect} = useConnect();
  const {t} = useTranslation('ConnectScreen');
  const {connectUsingWalletConnect} = useWalletConnectDeeplink();

  const {mobilePlatform} = getBrowserInfo();

  const handleConnect = useCallback(
    (connector: Connector) => {
      const {
        connector: wagmiConnector,
        desktopAppLink,
        id,
        marketingSite,
        mobileAppPrefixes,
        name,
        qrCodeSupported,
      } = connector;

      /**
       * This is destructured intentionally.
       *
       * With Redux we cannot store non-serialized data, meaning that
       * anything which is constructed (e.g. a Connector from Wagmi)
       */
      dispatch(
        setPendingConnector({
          desktopAppLink,
          id,
          marketingSite,
          mobileAppPrefixes,
          name,
          qrCodeSupported,
        }),
      );

      connect({connector: wagmiConnector});

      const isWagmiWalletConnect = wagmiConnector.id === 'walletConnect';
      const isWalletConnect =
        connector.id === 'walletConnect' && isWagmiWalletConnect;

      /**
       * We need to take the user to the scan screen under some rather specific
       * conditions. That is, the user is connecting with a WalletConnect connector
       * and is not on mobile OR if the user is connecting with Coinbase but doesn't
       * have the Coinbase extension installed and isn't on a mobile device.
       */
      const shouldUseCoinbaseScanScreen =
        wagmiConnector.id === 'coinbaseWallet' && !isInstalled('Coinbase');

      const shouldUseScanScreen =
        id !== 'ledger' &&
        (isWagmiWalletConnect || shouldUseCoinbaseScanScreen) &&
        !mobilePlatform;

      if (shouldUseScanScreen) {
        dispatch(navigate('Scan'));
        return;
      }

      /**
       * If the user chooses Ledger (when we're using Ledger Connect Kit)
       * or WalletConnect and is on mobile close the modal to prevent
       * stacked modals.
       */
      const shouldCloseModal = isWalletConnect && mobilePlatform;

      if (shouldCloseModal) {
        dispatch(closeModal());
        return;
      }

      /**
       * Check if this connector is using WalletConnect under the hood
       */
      if (connector.id !== 'walletConnect' && isWagmiWalletConnect) {
        connectUsingWalletConnect(connector);
      }

      dispatch(navigate('Connecting'));
    },
    [connect, connectUsingWalletConnect, dispatch, mobilePlatform],
  );

  const handleNavigateDelegateWallets = useCallback(() => {
    dispatch(navigate('DelegateWallets'));
  }, [dispatch]);

  return (
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-3 sbc-p-popover sbc-pt-0">
      {connectors.map((providedConnector) => {
        const {connector, id, name} = providedConnector;

        if (!connector.ready && !mobilePlatform) {
          return null;
        }

        return (
          <ConnectorButton
            id={id}
            key={id}
            onClick={() => handleConnect(providedConnector)}
            name={name}
          />
        );
      })}
      <div className="sbc-flex sbc-flex-row sbc-self-center sbc-whitespace-pre-wrap">
        <div className="sbc-mr-2 sbc-w-4">{DelegateCash}</div>
        <Text
          as="a"
          color="secondary"
          onClick={handleNavigateDelegateWallets}
          className="sbc-cursor-pointer sbc-underline"
        >
          {t('delegateWallets.delegateWallets')}
        </Text>
        <Text color="secondary">{t('delegateWallets.supported')}</Text>
      </div>
    </div>
  );
};

export default ConnectScreen;
