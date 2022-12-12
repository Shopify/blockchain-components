import {Fragment} from 'react';
import {LinkButton, ButtonWrapper} from './style';

export type ButtonBaseProps = {
  id?: string;
  className?: HTMLDivElement['className'];
  label: string;
  primary?: boolean;
  fullWidth?: boolean;
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
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const {Wrapper, wrapperProps} = link
    ? {
        Wrapper: LinkButton,
        wrapperProps: {
          id: id,
          role: 'link',
          href: link.href,
          target: link.target,
          title: label,
          ariaLabel: label,
        },
      }
    : {Wrapper: Fragment, wrapperProps: {}};

  return (
    <Wrapper {...wrapperProps}>
      <ButtonWrapper
        id={id}
        primary={primary}
        fullWidth={fullWidth}
        type="button"
        {...props}
      >
        {label}
      </ButtonWrapper>
    </Wrapper>
  );
};
