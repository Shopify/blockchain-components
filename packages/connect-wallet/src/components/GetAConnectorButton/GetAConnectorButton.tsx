import {useMemo} from 'react';
import {Text} from 'shared';
import {Button} from 'shared/src/components/Button';

import {ConnectorIcon} from '../ConnectorIcon';
import {useConnectorData} from '../../hooks/useConnectorData';
import {useTranslation} from '../../hooks/useTranslation';
import {getBrowserInfo} from '../../utils/getBrowser';

import {ConnectorData, Wrapper} from './style';

interface GetAConnectorButtonProps {
  connectorId: string;
}

export const GetAConnectorButton = ({
  connectorId,
}: GetAConnectorButtonProps) => {
  const {marketingSite, mobileApps, name} = useConnectorData({id: connectorId});
  const {t} = useTranslation('GetAConnectorButton');
  const {mobilePlatform} = getBrowserInfo();

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

  const buttonLabel = t('buttonText', {name});

  if (!downloadLink) {
    return null;
  }

  return (
    <Wrapper>
      <ConnectorData>
        <ConnectorIcon id={connectorId} size="Md" />
        <Text as="span" variant="bodyLg">
          {name}
        </Text>
      </ConnectorData>

      <Button
        aria-label={buttonLabel}
        label={buttonLabel}
        link={{href: downloadLink, target: '_blank'}}
      />
    </Wrapper>
  );
};

export default GetAConnectorButton;
