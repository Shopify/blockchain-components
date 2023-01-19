import {Text, Button} from 'shared';

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
        primary
        size="Lg"
      />

      <Text as="p" variant="bodyMd">
        {t('description')}
      </Text>
    </Wrapper>
  );
};

export {SoldOutButton};
