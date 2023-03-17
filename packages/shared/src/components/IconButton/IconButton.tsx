import {useEventWithTracking} from '@shopify/blockchain-components';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

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
    <button
      className="sbc-flex sbc-h-5 sbc-w-5 sbc-cursor-pointer sbc-items-center sbc-justify-center sbc-bg-transparent sbc-p-0 sbc-text-secondary sbc-shadow-none sbc-outline-none sbc-transition-opacity sbc-border-none hover:sbc-opacity-60 focus:sbc-text-secondary focus-visible:sbc-opacity-60"
      onClick={onClickWithTracking}
      {...rest}
      type="button"
    >
      <div className="sbc-pointer-events-none">{icon}</div>
    </button>
  );
};

export default IconButton;
