import {useI18n} from '@shopify/react-i18n';

import {SoldOutButtonStyle, SoldOutButtonDescriptionStyle} from './style';

const SoldOutButton = () => {
  const [i18n] = useI18n();

  return (
    <>
      <SoldOutButtonStyle>
        {i18n.translate('SoldOutButton.buttonText')}
      </SoldOutButtonStyle>
      <SoldOutButtonDescriptionStyle>
        {i18n.translate('SoldOutButton.description')}
      </SoldOutButtonDescriptionStyle>
    </>
  );
};

export {SoldOutButton};
