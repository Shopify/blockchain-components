import {Dawn, Default, Theme} from 'shared';

/**
 * Components
 */
export {ConnectButton} from './components/ConnectButton/ConnectButton';
export {ConnectorIcon} from './components/ConnectorIcon/ConnectorIcon';

/**
 * Constants
 */
export {buildConnectors} from './connectors/buildConnectors';
export {getDefaultConnectors} from './connectors/getDefaultConnectors';

/**
 * Hooks
 */
export {useConnectionModal} from './hooks/useConnectionModal';
export {useConnectWallet} from './hooks/useConnectWallet';

/**
 * Providers
 */
export {ConnectWalletProvider} from './providers/ConnectWalletProvider';

/**
 * Themes
 */
export {Dawn, Default};

/**
 * Types
 */
export type {Theme};
export type {
  Connector,
  CustomConnector,
  SerializedConnector,
} from './types/connector';
export type {Wallet} from './types/wallet';
