import {useConnectorData} from '../../hooks/useConnectorData';

import {ConnectorIconWrapper} from './style';

const ConnectorIcon = ({id = 'unknown'}: {id?: string}) => {
  const {icon} = useConnectorData({id});

  if (!icon) return null;

  return <ConnectorIconWrapper>{icon}</ConnectorIconWrapper>;
};

export {ConnectorIcon};
