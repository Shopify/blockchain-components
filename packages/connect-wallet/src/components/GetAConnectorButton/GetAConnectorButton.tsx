import {useMemo} from 'react';
import {useI18n} from '@shopify/react-i18n';
import {Text} from 'shared';
import {Button} from 'shared/src/components/Button';

import {ConnectorIcon} from '../ConnectorIcon';
import {useConnectorData} from '../../hooks/useConnectorData';
import {Size} from '../../types/sizes';
import {getBrowserInfo} from '../../utils/getBrowser';

import {ConnectorData, Wrapper} from './style';

interface GetAConnectorButtonProps {
  connectorId: string;
}

export const GetAConnectorButton = ({
  connectorId,
}: GetAConnectorButtonProps) => {
  const {marketingSite, mobileApps, name} = useConnectorData({id: connectorId});
  const {mobilePlatform} = getBrowserInfo();
  const [i18n] = useI18n();

  const downloadLink = useMemo(() => {
    if (!marketingSite && mobileApps) {
      return null;
    }

    if (mobilePlatform === 'Android') {
      return mobileApps?.Android || marketingSite;
    }

    if (mobilePlatform === 'iOS') {
      return mobileApps?.iOS || marketingSite;
    }

    return marketingSite;
  }, [marketingSite, mobileApps, mobilePlatform]);

  if (!downloadLink) {
    return null;
  }

  return (
    <Wrapper>
      <ConnectorData>
        <ConnectorIcon id={connectorId} size={Size.Medium} />
        <Text as="span" variant="bodyLg">
          {name}
        </Text>
      </ConnectorData>

      <Button
        aria-label={i18n.translate('GetAConnectorButton.accessibilityLabel', {
          name,
        })}
        label={i18n.translate('GetAConnectorButton.buttonText')}
        link={{href: downloadLink, target: '_blank'}}
      />
    </Wrapper>
  );
};

export default GetAConnectorButton;
