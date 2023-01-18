import {Button, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useConnectorData} from '../../hooks/useConnectorData';
import {useTranslation} from '../../hooks/useTranslation';

import {ConnectorData, Wrapper} from './style';

interface GetAConnectorButtonProps {
  connectorId: string;
}

export const GetAConnectorButton = ({
  connectorId,
}: GetAConnectorButtonProps) => {
  const {marketingSite, name} = useConnectorData({id: connectorId});
  const {t} = useTranslation('GetAConnectorButton');

  if (!marketingSite) {
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
        aria-label={t('accessibilityLabel', {name}) as string}
        label={t('buttonText') as string}
        link={{href: marketingSite, target: '_blank'}}
      />
    </Wrapper>
  );
};

export default GetAConnectorButton;
