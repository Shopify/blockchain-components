import {Wallet} from '../../types/wallet';

export interface ConnectButtonProps {
  /**
   * Defaults to `'dropdown'`;
   *
   * Optional value: `'modal'` can be used if your button is rendered
   * within a smaller viewport or when you prefer to have the connected
   * wallet information displayed in a modal as opposed to a dropdown.
   */
  popoverType?: 'dropdown' | 'modal';
}

export interface ConnectedPopoverProps extends Required<ConnectButtonProps> {
  onDismiss: () => void;
  visible: boolean;
  wallet: Wallet;
}
