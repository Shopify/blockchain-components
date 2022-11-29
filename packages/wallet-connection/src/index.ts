/**
 * Components
 */
export {ConnectWalletButton} from './components/ConnectWalletButton/ConnectWalletButton';

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
export {useModal} from './providers/ModalProvider';
export {useExternalWalletConnection as useWalletConnection} from './providers/WalletConnectionProvider';

/**
 * Providers
 */
export {WalletConnectionProvider} from './providers/WalletConnectionProvider';

/**
 * Types
 */
export type {Wallet} from './types/wallet';
