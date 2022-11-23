import {LinkButton, ButtonWrapper} from './style';

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
      /**
       * Should indicate that it's an external link somehow, maybe with an icon
       * Will add once the design for this page is confirmed
       */
      <LinkButton
        id={id}
        aria-role="link"
        href={link.href}
        target={link.target}
        title={label}
        aria-label={label}
      >
        <ButtonWrapper id={id} type="button" {...props}>
          {label}
        </ButtonWrapper>
      </LinkButton>
    );
  }

  return (
    <ButtonWrapper id={id} type="button" primary={primary} {...props}>
      {label}
    </ButtonWrapper>
  );
};
