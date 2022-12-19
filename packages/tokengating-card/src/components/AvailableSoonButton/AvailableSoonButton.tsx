import {useI18n} from '@shopify/react-i18n';

import {AvailableSoonButtonStyle} from './style';

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
  const [i18n] = useI18n();

  return (
    <AvailableSoonButtonStyle>
      {i18n.translate('AvailableSoonButton.buttonText', {
        date: convert(availableDate),
      })}
    </AvailableSoonButtonStyle>
  );
};
export {AvailableSoonButton};
