import {useI18n} from '@shopify/react-i18n';
import {Text, Button} from 'shared';

import {Wrapper} from './style';

const SoldOutButton = () => {
  const [i18n] = useI18n();

  return (
    <Wrapper>
      <Button
        fullWidth
        primary
        disabled
        label={i18n.translate('SoldOutButton.buttonText')}
      />

      <Text as="p" variant="bodyMd">
        {i18n.translate('SoldOutButton.description')}
      </Text>
    </Wrapper>
  );
};

export {SoldOutButton};
