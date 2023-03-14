import {Text, Button} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';

const SoldOutButton = () => {
  const {t} = useTranslation('SoldOutButton');

  return (
    <div className="sbc-w-full">
      <Button
        aria-label={t('buttonText')}
        disabled
        fullWidth
        label={t('buttonText')}
        size="Lg"
      />

      <Text
        as="p"
        color="secondary"
        className="sbc-mt-2 sbc-w-full sbc-cursor-default sbc-text-center"
        variant="bodyMd"
      >
        {t('description')}
      </Text>
    </div>
  );
};

export {SoldOutButton};
