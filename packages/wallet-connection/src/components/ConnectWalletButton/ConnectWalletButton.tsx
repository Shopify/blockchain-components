import {useCallback} from 'react';
import {Button} from 'shared';

import {useModal} from '../../providers/ModalProvider';

export interface ConnectWalletButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * The button opens the connection modal by default, however, you're able to provide
   * additional functionality in the onClick function if you need to add any form of
   * reporting or metrics.
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const ConnectWalletButton = ({
  label,
  onClick,
}: ConnectWalletButtonProps) => {
  const {openModal} = useModal();

  const handleClick = useCallback(() => {
    openModal();
    onClick?.();
  }, [onClick]);

  return <Button label={label} onClick={handleClick} />;
};
