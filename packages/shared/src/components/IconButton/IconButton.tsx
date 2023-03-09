import {useEventWithTracking} from '@shopify/blockchain-components';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

import {StyledButton} from './style';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClickEventName?: string;
  icon: ReactNode;
}

const IconButton = ({
  icon,
  onClickEventName,
  onClick,
  ...rest
}: IconButtonProps) => {
  const onClickWithTracking = useEventWithTracking({
    eventName: onClickEventName,
    callback: onClick,
  });
  return (
    <StyledButton onClick={onClickWithTracking} {...rest} type="button">
      {icon}
    </StyledButton>
  );
};

export default IconButton;
