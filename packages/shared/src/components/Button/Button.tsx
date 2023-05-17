import {useEventWithTracking} from '@shopify/blockchain-components';

import {ClassName} from '../../types/generic';
import {Spinner} from '../Spinner';
import {Text, Variant} from '../Text';

import type {ButtonProps, GetButtonClassnameProps, Size} from './types';

// Sizes
const LG_CSS: ClassName = 'sbc-rounded-button-large sbc-p-button-large';
const MD_CSS: ClassName = 'sbc-rounded-button-medium sbc-p-button-medium';
const SM_CSS: ClassName = 'sbc-rounded-button-small sbc-p-button-small';

// Variants
const PRIMARY_CSS: ClassName = 'sbc-btn-primary';
const SECONDARY_CSS: ClassName = 'sbc-btn-secondary';
const DISABLED_CSS: ClassName = 'sbc-btn-disabled';

const SIZE_MAP: Record<`${Size}`, {style: ClassName; variant: Variant}> = {
  Sm: {
    style: SM_CSS,
    variant: 'bodyMd',
  },
  Md: {
    style: MD_CSS,
    variant: 'bodyMd',
  },
  Lg: {
    style: LG_CSS,
    variant: 'bodyLg',
  },
};

export const getButtonClassname = ({
  centered = true,
  className,
  disabled = false,
  fullWidth = false,
  primary = false,
  size = 'Md',
}: GetButtonClassnameProps): ClassName => {
  const {style: sizeCSS} = SIZE_MAP[size];

  const baseCSS: ClassName =
    'sbc-m-0 sbc-flex sbc-flex-row sbc-items-center sbc-no-underline sbc-transition-colors sbc-appearance-none';

  const enabledCSS = primary ? PRIMARY_CSS : SECONDARY_CSS;
  const justifyCSS: ClassName = centered
    ? 'sbc-justify-center'
    : 'sbc-justify-start';
  const widthCSS: ClassName = fullWidth ? 'sbc-w-full' : 'sbc-w-fit';
  const variantCSS = disabled ? DISABLED_CSS : enabledCSS;

  const classes = [
    baseCSS,
    justifyCSS,
    sizeCSS,
    widthCSS,
    variantCSS,
    ...(className ? [className] : []),
  ];

  return classes.join(' ');
};

export const Button = ({
  centered = true,
  className,
  disabled = false,
  fullWidth = false,
  label,
  link,
  loading = false,
  onClick,
  onClickEventName,
  onClickEventPayload,
  primary = false,
  size = 'Md',
  ...props
}: ButtonProps) => {
  const onClickWithTracking = useEventWithTracking({
    eventName: onClickEventName,
    callback: onClick,
  });
  const wrapperProps = link
    ? {
        href: link.href,
        target: link.target,
        title: label,
        ...props,
      }
    : props;

  const {variant: sizeVariant} = SIZE_MAP[size];
  const buttonCSS = getButtonClassname({
    className,
    disabled,
    fullWidth,
    primary,
    size,
  });

  return (
    <button
      aria-disabled={disabled}
      aria-label={label}
      className={buttonCSS}
      disabled={disabled}
      onClick={onClickWithTracking}
      role={link ? 'link' : 'button'}
      type="button"
      {...wrapperProps}
    >
      {/*
       * Future improvement would be to address the button size
       * not changing when the spinner is present and hiding
       * the text while rendering the spinner on top of it.
       */}
      {loading ? (
        <Spinner />
      ) : (
        <Text
          as="label"
          className="sbc-pointer-events-none"
          variant={sizeVariant}
        >
          {label}
        </Text>
      )}
    </button>
  );
};
