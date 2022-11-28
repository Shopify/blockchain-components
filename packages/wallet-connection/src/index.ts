/**
 * Components
 */
export {ConnectWalletButton} from './components/ConnectWalletButton/ConnectWalletButton';
export {useModal} from './providers/ModalProvider';

/**
 * Constants
 */
// These aren't working for WalletConnect for some reason 😕
// export {defaultConnectors} from './constants/defaults';

/**
 * Hooks
 */
export {useWallet} from './hooks/useWallet';
export {useConnectionModal} from './hooks/useConnectionModal';

/**
 * Providers
 */
export {WalletConnectionProvider} from './providers/WalletConnectionProvider';

/**
 * Types
 */
export type {ConnectedWallet} from './hooks/useWallet';
