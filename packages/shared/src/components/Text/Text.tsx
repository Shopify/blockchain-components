/* eslint-disable id-length */
import {createElement} from 'react';

import {ClassName} from '../../types/generic';

import {Color, Element, TextProps, Variant} from './types';

const COLOR_CSS: Record<Color, ClassName> = {
  'button-disabled': 'sbc-text-button-disabled',
  'button-primary': 'sbc-text-button-primary',
  'button-secondary': 'sbc-text-button-secondary',
  critical: 'sbc-text-critical',
  disabled: 'sbc-text-disabled',
  primary: 'sbc-text-primary',
  secondary: 'sbc-text-secondary',
};

const BODY_LG_CSS: ClassName =
  'sbc-font-body-lg sbc-text-body-lg sbc-leading-body-lg';
const BODY_MD_CSS: ClassName =
  'sbc-font-body-md sbc-text-body-md sbc-leading-body-md';
const BODY_SM_CSS: ClassName =
  'sbc-font-body-sm sbc-text-body-sm sbc-leading-body-sm';
const HEADING_LG_CSS: ClassName =
  'sbc-font-heading-lg sbc-text-heading-lg sbc-leading-heading-lg';
const HEADING_MD_CSS: ClassName =
  'sbc-font-heading-md sbc-text-heading-md sbc-leading-heading-md';
const HEADING_SM_CSS: ClassName =
  'sbc-font-heading-sm sbc-text-heading-sm sbc-leading-heading-sm';

const VARIANT_CSS: Record<Variant, ClassName> = {
  bodyLg: BODY_LG_CSS,
  bodyMd: BODY_MD_CSS,
  bodySm: BODY_SM_CSS,
  headingLg: HEADING_LG_CSS,
  headingMd: HEADING_MD_CSS,
  headingSm: HEADING_SM_CSS,
};

export const Text = ({
  as = 'span',
  children,
  color,
  variant = 'bodyMd',
  ...props
}: TextProps) => {
  const className = [
    // Base CSS
    'sbc-m-0',
    VARIANT_CSS[variant],
    // If a color was provided, use that color. Otherwise, inherit color
    color ? COLOR_CSS[color] : 'sbc-text-inherit',
    // Since className can be undefined, we need to use this spread hack unless
    // we want an additional space in our class on the DOM element.
    ...(props.className ? [props.className] : []),
  ].join(' ');

  const wrapperProps = {
    ...props,
    // Prevents loss of classNames when spreading props
    className,
  };

  const TextComponent: Record<Element, JSX.Element> = {
    a: createElement('a', wrapperProps, children),
    h1: createElement('h1', wrapperProps, children),
    h2: createElement('h2', wrapperProps, children),
    h3: createElement('h3', wrapperProps, children),
    h4: createElement('h4', wrapperProps, children),
    h5: createElement('h5', wrapperProps, children),
    h6: createElement('h6', wrapperProps, children),
    label: createElement('label', wrapperProps, children),
    p: createElement('p', wrapperProps, children),
    span: createElement('span', wrapperProps, children),
  };

  return TextComponent[as];
};
