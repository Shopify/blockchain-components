import {useEventWithTracking} from '@shopify/blockchain-components';

import {Text, Variant} from '../Text';
import {Spinner} from '../Spinner';
import {ClassName} from '../../types/generic';

import type {ButtonProps, Size} from './types';

// Sizes
const LG_CSS: ClassName = 'sbc-rounded-button-large sbc-p-button-large';
const MD_CSS: ClassName = 'sbc-rounded-button-medium sbc-p-button-medium';
const SM_CSS: ClassName = 'sbc-rounded-button-small sbc-p-button-small';

// Variants
const PRIMARY_CSS: ClassName =
  'sbc-bg-button-primary sbc-border-button-primary sbc-text-button-primary hover:sbc-bg-button-primary-hover';
const SECONDARY_CSS: ClassName =
  'sbc-bg-button-secondary sbc-border-button-secondary sbc-text-button-secondary hover:sbc-bg-button-secondary-hover';
const DISABLED_CSS: ClassName =
  'sbc-bg-button-disabled sbc-border-button-disabled sbc-text-button-disabled';

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
  disabled,
  fullWidth,
  primary,
  size,
}: Required<
  Pick<ButtonProps, 'disabled' | 'fullWidth' | 'primary' | 'size'>
>): ClassName => {
  const {style: sizeCSS} = SIZE_MAP[size];

  const enabledCSS = primary ? PRIMARY_CSS : SECONDARY_CSS;
  const variantClass = `${disabled ? DISABLED_CSS : enabledCSS} ${sizeCSS}`;

  return `sbc-m-0 sbc-flex sbc-flex-row sbc-items-center sbc-justify-center sbc-no-underline sbc-transition-colors ${
    fullWidth ? 'sbc-w-full' : 'sbc-w-fit'
  } ${variantClass}`;
};

export const Button = ({
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
  const className = getButtonClassname({disabled, fullWidth, primary, size});

  return (
    <button
      aria-disabled={disabled}
      aria-label={label}
      className={className}
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
