import {PropsWithChildren} from 'react';
import {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

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
  | 'body'
  | 'bodyBold'
  | 'bodySm'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm';

export type VariantCSS = FlattenInterpolation<ThemeProps<DefaultTheme>>;

export interface TextProps extends PropsWithChildren {
  as: Element;
  color?: Color;
  variant?: Variant;
}
