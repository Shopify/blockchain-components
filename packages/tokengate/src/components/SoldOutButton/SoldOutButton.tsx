import {Text, Button} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';

import {Wrapper} from './style';

const SoldOutButton = () => {
  const {t} = useTranslation('SoldOutButton');

  return (
    <Wrapper>
      <Button fullWidth primary disabled label={t('buttonText')} />

      <Text as="p" variant="bodyMd">
        {t('description')}
      </Text>
    </Wrapper>
  );
};

export {SoldOutButton};
