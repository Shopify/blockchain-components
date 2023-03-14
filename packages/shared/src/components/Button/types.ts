export type Size = 'Sm' | 'Md' | 'Lg';

interface ButtonBaseProps {
  id?: string;
  centered?: boolean;
  className?: HTMLDivElement['className'];
  fullWidth?: boolean;
  label: string;
  loading?: boolean;
  primary?: boolean;
  disabled?: boolean;
  size?: Size;
  onClickEventName?: string;
  onClickEventPayload?: Record<string, string>;
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

export type GetButtonClassnameProps = Pick<
  ButtonProps,
  'centered' | 'disabled' | 'fullWidth' | 'primary' | 'size'
>;
