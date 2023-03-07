import {useCallback, useContext} from 'react';

import {Text, Variant} from '../Text';
import {Spinner} from '../Spinner';
import {AnalyticsContext} from '../../providers/AnalyticsProvider';

import {ButtonWrapper} from './style';
import type {ButtonProps, Size} from './types';

export const Button = ({
  fullWidth = false,
  label,
  loading = false,
  link,
  primary = false,
  disabled = false,
  size = 'Md',
  onClick,
  onClickEventName,
  ...props
}: ButtonProps) => {
  const {publishEvent} = useContext(AnalyticsContext);
  const onClickWithTracking = useCallback(() => {
    if (onClickEventName) {
      publishEvent(onClickEventName);
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, onClickEventName, publishEvent]);
  const wrapperProps = link
    ? {
        href: link.href,
        target: link.target,
        title: label,
        ...props,
      }
    : props;

  const sizeMappedToTextVariant: {[S in Size]: Variant} = {
    Sm: 'bodyMd',
    Md: 'bodyMd',
    Lg: 'bodyLg',
  };

  return (
    <ButtonWrapper
      aria-disabled={disabled}
      aria-label={label}
      as={link ? 'a' : 'button'}
      disabled={disabled}
      fullWidth={fullWidth}
      primary={loading ? false : primary}
      role={link ? 'link' : 'button'}
      size={size}
      type="button"
      onClick={onClickWithTracking}
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
        <Text as="label" bold variant={sizeMappedToTextVariant[size]}>
          {label}
        </Text>
      )}
    </ButtonWrapper>
  );
};
