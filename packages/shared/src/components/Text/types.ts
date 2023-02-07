import {PropsWithChildren} from 'react';

export type Color = 'critical' | 'disabled' | 'primary' | 'secondary';

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

export interface TextProps extends PropsWithChildren {
  as?: Element;
  bold?: boolean;
  color?: Color;
  variant?: Variant;
}
