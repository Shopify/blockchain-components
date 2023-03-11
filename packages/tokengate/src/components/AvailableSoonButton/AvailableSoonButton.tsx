import {Button} from '@shopify/blockchain-components';

import {useTranslation} from '../../hooks/useTranslation';

interface AvailableSoonButtonProps {
  availableDate?: string;
}

function convert(availableDate: AvailableSoonButtonProps['availableDate']) {
  if (!availableDate) return;

  const dateObject = new Date(availableDate);

  const date = dateObject.toLocaleString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const time = dateObject.toLocaleString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${date}, ${time}`;
}

const AvailableSoonButton = ({availableDate}: AvailableSoonButtonProps) => {
  const {t} = useTranslation('AvailableSoonButton');

  return (
    <Button
      aria-label={t('buttonText', {
        date: convert(availableDate),
      })}
      disabled
      fullWidth
      label={t('buttonText', {
        date: convert(availableDate),
      })}
      size="Lg"
    />
  );
};
export {AvailableSoonButton};
