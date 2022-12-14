import {useConnectorData} from '../../hooks/useConnectorData';

import {ConnectorIconWrapper} from './style';

export const ConnectorIcon = ({id = 'unknown'}: {id?: string}) => {
  const {icon} = useConnectorData({id});

  if (!icon) return null;

  return <ConnectorIconWrapper>{icon}</ConnectorIconWrapper>;
};
