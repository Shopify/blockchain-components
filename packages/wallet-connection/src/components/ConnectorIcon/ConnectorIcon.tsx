import {ConnectorIconWrapper} from './style';
import {findConnector} from '../../constants/connectors';

const ConnectorIcon = ({
  connectorName,
  wagmiId,
}: {
  connectorName?: string;
  wagmiId?: string;
}) => {
  const {icon} = findConnector({connectorName, wagmiId});

  if (!icon) return null;

  return <ConnectorIconWrapper>{icon}</ConnectorIconWrapper>;
};

export {ConnectorIcon};
