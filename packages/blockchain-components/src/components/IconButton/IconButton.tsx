import {ComponentPropsWithoutRef, ReactNode} from 'react';
import {useEventWithTracking} from '../../utils/analytics/ClientAnalytics';

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
