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
  const {t} = useTranslation('ConnectorButton');

  return (
    <Button
      aria-label={t('accessibilityLabel', {name}) as string}
      onClick={onClick}
    >
      <ConnectorIcon id={id} size="Sm" />
      <Text as="label" variant="bodyLg">
        {name}
      </Text>
    </Button>
  );
};
