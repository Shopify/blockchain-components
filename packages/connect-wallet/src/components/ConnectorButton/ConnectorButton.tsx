import {useEventWithTracking, eventNames} from '@shopify/blockchain-components';
import {getButtonClassname, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';

import {useTranslation} from '~/hooks';

interface ConnectorButtonProps {
  id: string;
  name: string;
  onClick: () => void;
}

export const ConnectorButton = ({id, name, onClick}: ConnectorButtonProps) => {
  const onClickWithTracking = useEventWithTracking({
    eventName: eventNames.CONNECT_WALLET_CONNECTOR_BUTTON_CLICKED,
    callback: onClick,
    payload: {connector: name},
  });
  const {t} = useTranslation('ConnectorButton');

  const buttonClassName = getButtonClassname({
    centered: false,
    fullWidth: true,
    size: 'Lg',
  });

  return (
    <button
      aria-label={t('accessibilityLabel', {name}) as string}
      className={`${buttonClassName} sbc-flex sbc-items-center sbc-gap-x-2 sbc-p-3 last-of-type:sbc-mb-0`}
      onClick={onClickWithTracking}
      type="button"
    >
      <ConnectorIcon id={id} size="sm" />
      <Text as="label" className="sbc-pointer-events-none" variant="bodyLg">
        {name}
      </Text>
    </button>
  );
};
