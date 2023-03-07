import {EventName} from '../../utils/analytics/types';

export type Size = 'Sm' | 'Md' | 'Lg';

interface ButtonBaseProps {
  id?: string;
  className?: HTMLDivElement['className'];
  fullWidth?: boolean;
  label: string;
  loading?: boolean;
  primary?: boolean;
  disabled?: boolean;
  size?: Size;
  onClickEventName?: EventName;
}

type LinkButtonProps = ButtonBaseProps & {
  link: {
    href: HTMLAnchorElement['href'];
    target?: HTMLAnchorElement['target'];
  };
  onClick?: never;
};

type DefaultButtonProps = ButtonBaseProps & {
  link?: never;
  onClick?: () => void;
};

export type ButtonProps = DefaultButtonProps | LinkButtonProps;
