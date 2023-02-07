import {useConnectorData} from '../../hooks/useConnectorData';
import {Size, SizeProp} from '../../types/sizes';

import {ConnectorIconWrapper} from './style';

interface ConnectorIconProps {
  id?: string;
  size: SizeProp;
}

export const ConnectorIcon = ({id = 'unknown', size}: ConnectorIconProps) => {
  const {icon} = useConnectorData({id});

  if (!icon) return null;

  return <ConnectorIconWrapper size={Size[size]}>{icon}</ConnectorIconWrapper>;
};
