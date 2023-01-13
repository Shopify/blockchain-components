import {Button} from 'shared';

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
      fullWidth
      primary
      disabled
      label={t('buttonText', {
        date: convert(availableDate),
      })}
    />
  );
};
export {AvailableSoonButton};
