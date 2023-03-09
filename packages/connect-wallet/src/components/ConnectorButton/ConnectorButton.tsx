import {useEventWithTracking, eventNames} from '@shopify/blockchain-components';
import {Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useTranslation} from '../../hooks/useTranslation';

import {Button} from './style';

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

  return (
    <Button
      aria-label={t('accessibilityLabel', {name}) as string}
      fullWidth
      onClick={onClickWithTracking}
      size="Lg"
    >
      <ConnectorIcon id={id} size="Sm" />
      <Text as="label" variant="bodyLg">
        {name}
      </Text>
    </Button>
  );
};
