import {Fragment} from 'react';

import {Spinner} from '../Spinner';

import {LinkButton, ButtonWrapper} from './style';

export interface ButtonBaseProps {
  id?: string;
  className?: HTMLDivElement['className'];
  fullWidth?: boolean;
  loading?: boolean;
  primary?: boolean;
  disabled?: boolean;
}

export type LinkButtonProps = ButtonBaseProps & {
  label: string;
  link: {
    href: HTMLAnchorElement['href'];
    target?: HTMLAnchorElement['target'];
  };
  onClick?: never;
};

export type DefaultButtonProps = ButtonBaseProps & {
  link?: never;
  label: React.ReactNode;
  onClick?: () => void;
};

export type ButtonProps = DefaultButtonProps | LinkButtonProps;

export const Button = ({
  id,
  fullWidth = false,
  label,
  loading = false,
  link,
  primary = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const {Wrapper, wrapperProps} = link
    ? {
        Wrapper: LinkButton,
        wrapperProps: {
          id,
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
        primary={loading ? false : primary}
        disabled={disabled}
        aria-disabled={disabled}
        fullWidth={fullWidth}
        type="button"
        {...props}
      >
        {loading ? <Spinner /> : label}
      </ButtonWrapper>
    </Wrapper>
  );
};
