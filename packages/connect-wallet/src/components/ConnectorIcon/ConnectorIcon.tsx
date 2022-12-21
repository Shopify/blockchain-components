import {useConnectorData} from '../../hooks/useConnectorData';
import {Size} from '../../types/sizes';

import {ConnectorIconWrapper} from './style';

interface ConnectorIconProps {
  id?: string;
  size?: Size;
}

export const ConnectorIcon = ({
  id = 'unknown',
  size = Size.Small,
}: ConnectorIconProps) => {
  const {icon} = useConnectorData({id});

  if (!icon) return null;

  return <ConnectorIconWrapper size={size}>{icon}</ConnectorIconWrapper>;
};
