import {useMemo} from 'react';
import {Button} from 'shared/src/components/Button';

import {ConnectorName} from '../ConnectorButton';
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
        <ConnectorIcon id={connectorId} size={Size.Large} />
        <ConnectorName>{name}</ConnectorName>
      </ConnectorData>

      <Button
        aria-label={`Get ${name}`}
        label="Get"
        link={{href: downloadLink, target: '_blank'}}
      />
    </Wrapper>
  );
};

export default GetAConnectorButton;
