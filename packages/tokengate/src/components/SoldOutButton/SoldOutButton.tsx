import {Text, Button} from '@shopify/blockchain-components';

import {useTranslation} from '../../hooks/useTranslation';

import {Wrapper} from './style';

const SoldOutButton = () => {
  const {t} = useTranslation('SoldOutButton');

  return (
    <Wrapper>
      <Button
        aria-label={t('buttonText')}
        disabled
        fullWidth
        label={t('buttonText')}
        size="Lg"
      />

      <Text as="p" variant="bodyMd" color="secondary">
        {t('description')}
      </Text>
    </Wrapper>
  );
};

export {SoldOutButton};
