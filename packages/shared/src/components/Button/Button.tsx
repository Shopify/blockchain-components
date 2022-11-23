import {ButtonStyle, ButtonText, LinkButton} from './style';

export type ButtonBaseProps = {
  id?: string;
  className?: HTMLDivElement['className'];
  label: string;
  primary?: boolean;
};

export type LinkButtonProps = ButtonBaseProps & {
  link: {
    href: HTMLAnchorElement['href'];
    target?: HTMLAnchorElement['target'];
  };
  onClick?: never;
};

export type DefaultButtonProps = ButtonBaseProps & {
  link?: never;
  onClick?: () => void;
};

export type ButtonProps = DefaultButtonProps | LinkButtonProps;

export const Button = ({
  id,
  label,
  link,
  primary = false,
  ...props
}: ButtonProps) => {
  if (link) {
    return (
      <LinkButton
        id={id}
        aria-role="link"
        href={link.href}
        target={link.target}
        title={label}
        aria-label={label}
      >
        <ButtonText>{label}</ButtonText>
      </LinkButton>
    );
  }

  return (
    <ButtonStyle id={id} type="button" {...props}>
      <ButtonText>{label}</ButtonText>
    </ButtonStyle>
  );
};
