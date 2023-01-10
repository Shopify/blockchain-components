import {useI18n} from '@shopify/react-i18n';
import {Text} from 'shared';

import {SoldOutButtonStyle, Wrapper} from './style';

const SoldOutButton = () => {
  const [i18n] = useI18n();

  return (
    <Wrapper>
      <SoldOutButtonStyle fullWidth>
        {i18n.translate('SoldOutButton.buttonText')}
      </SoldOutButtonStyle>

      <Text as="p" variant="body">
        {i18n.translate('SoldOutButton.description')}
      </Text>
    </Wrapper>
  );
};

export {SoldOutButton};
