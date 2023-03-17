import {ComponentProps} from 'react';

export type Color =
  | 'button-disabled'
  | 'button-primary'
  | 'button-secondary'
  | 'critical'
  | 'disabled'
  | 'primary'
  | 'secondary';

export type Element =
  | 'a'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'p'
  | 'span';

export type Variant =
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm';

interface AdditionalElementProps {
  a: ComponentProps<'a'>;
  h1: ComponentProps<'h1'>;
  h2: ComponentProps<'h2'>;
  h3: ComponentProps<'h3'>;
  h4: ComponentProps<'h4'>;
  h5: ComponentProps<'h5'>;
  h6: ComponentProps<'h6'>;
  label: ComponentProps<'label'>;
  p: ComponentProps<'p'>;
  span: ComponentProps<'span'>;
}

export type TextProps = {
  as?: Element;
  /**
   * Deprecating to remove and make use of className props.
   * @deprecated
   */
  bold?: boolean;
  color?: Color;
  variant?: Variant;
} & AdditionalElementProps[Element];
