import {useI18n} from '@shopify/react-i18n';
import {Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';

import {Button} from './style';

interface ConnectorButtonProps {
  id: string;
  name: string;
  onClick: () => void;
}

export const ConnectorButton = ({id, name, onClick}: ConnectorButtonProps) => {
  const [i18n] = useI18n();

  return (
    <Button
      aria-label={i18n.translate('ConnectorButton.accessibilityLabel', {
        name,
      })}
      onClick={onClick}
    >
      <ConnectorIcon id={id} />
      <Text as="label" variant="headingSm">
        {name}
      </Text>
    </Button>
  );
};
