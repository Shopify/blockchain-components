import {useConnectorData} from '~/hooks';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CSS: Record<Size, string> = {
  xs: 'sbc-h-[20px] sbc-w-[20px]',
  sm: 'sbc-h-[24px] sbc-w-[24px]',
  md: 'sbc-h-[40px] sbc-w-[40px]',
  lg: 'sbc-h-[48px] sbc-w-[48px]',
  xl: 'sbc-h-[72px] sbc-w-[72px]',
};

interface ConnectorIconProps {
  id?: string;
  size: Size;
}

export const ConnectorIcon = ({id = 'unknown', size}: ConnectorIconProps) => {
  const {icon} = useConnectorData({id});

  if (!icon) return null;

  const className = SIZE_CSS[size];

  return <div className={className}>{icon}</div>;
};
