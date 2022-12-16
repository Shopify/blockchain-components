import en from './translations/en.json';
import {SoldOutButtonStyle, SoldOutButtonDescriptionStyle} from './style';
import {useI18n} from '@shopify/react-i18n';

const SoldOutButton = () => {
  const [i18n] = useI18n({
    id: 'SoldOutButton',
    translations() {
      return en;
    },
  });
  return (
    <>
      <SoldOutButtonStyle>Sold out</SoldOutButtonStyle>
      <SoldOutButtonDescriptionStyle>
        {i18n.translate('SoldOutButton.buttonText')}
      </SoldOutButtonDescriptionStyle>
    </>
  );
};

export {SoldOutButton};
