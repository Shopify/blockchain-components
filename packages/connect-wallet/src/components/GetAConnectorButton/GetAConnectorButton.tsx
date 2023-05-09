import {eventNames} from '@shopify/blockchain-components';
import {Button, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';

import {useConnectorData, useTranslation} from '~/hooks';

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
    <div className="sbc-flex sbc-flex-row sbc-items-center sbc-px-0 sbc-py-3 sbc-border-b-divider last-of-type:sbc-border-none">
      <div className="sbc-flex sbc-flex-1 sbc-items-center sbc-gap-x-3">
        <ConnectorIcon id={connectorId} size="md" />
        <Text as="span" color="primary" variant="bodyLg">
          {name}
        </Text>
      </div>

      <Button
        aria-label={t('accessibilityLabel', {name}) as string}
        label={t('buttonText') as string}
        link={{href: marketingSite, target: '_blank'}}
        size="Sm"
        onClickEventName={eventNames.CONNECT_WALLET_GET_WALLET_BUTTON_CLICKED}
        onClickEventPayload={{connector: name}}
      />
    </div>
  );
};

export default GetAConnectorButton;
