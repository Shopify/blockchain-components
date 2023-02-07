import {PropsWithChildren} from 'react';
import {
  CSSProperties,
  FlattenInterpolation,
  ThemeProps as StyledThemeProps,
} from 'styled-components';

type RequiredCSSProperty = Required<CSSProperties>;

export interface ButtonSize {
  borderRadius: RequiredCSSProperty['borderRadius'];
  padding: RequiredCSSProperty['padding'];
}

export interface ButtonVariant {
  background: RequiredCSSProperty['backgroundColor'];
  border: RequiredCSSProperty['border'];
  textColor: RequiredCSSProperty['color'];

  hover: {
    // The following are optional properties
    background?: CSSProperties['backgroundColor'];
    boxShadow?: CSSProperties['boxShadow'];
  };
}

export interface FontStyle {
  fontFamily: RequiredCSSProperty['fontFamily'];
  fontSize: RequiredCSSProperty['fontSize'];
  fontWeight: RequiredCSSProperty['fontWeight'];
  fontWeightBold?: CSSProperties['fontWeight'];
  lineHeight: RequiredCSSProperty['lineHeight'];
}

export interface Theme {
  name?: string;

  typography: {
    colorPrimary: RequiredCSSProperty['color'];
    colorSecondary: RequiredCSSProperty['color'];
    colorCritical: RequiredCSSProperty['color'];
    colorDisabled: RequiredCSSProperty['color'];
    bodyLg: FontStyle;
    bodyMd: FontStyle;
    bodySm: FontStyle;
    headingLg: FontStyle;
    headingMd: FontStyle;
    headingSm: FontStyle;
  };

  buttons: {
    sizes: {
      small: ButtonSize;
      medium: ButtonSize;
      large: ButtonSize;
    };

    variants: {
      primary: ButtonVariant;
      secondary: ButtonVariant;
      disabled: Omit<ButtonVariant, 'hover'>;
    };
  };

  modal: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    boxShadow: RequiredCSSProperty['boxShadow'];
    overlayBackground: RequiredCSSProperty['backgroundColor'];
    padding: RequiredCSSProperty['padding'];

    borderRadius: {
      desktop: RequiredCSSProperty['borderRadius'];
      mobile: RequiredCSSProperty['borderRadius'];
    };
  };

  other: {
    iconColor: RequiredCSSProperty['color'];
    dividerColor: RequiredCSSProperty['backgroundColor'];
  };

  popovers: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    borderRadius: RequiredCSSProperty['borderRadius'];
    boxShadow: RequiredCSSProperty['boxShadow'];
  };

  tokengate: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    borderRadius: RequiredCSSProperty['borderRadius'];
    boxShadow: RequiredCSSProperty['boxShadow'];
    padding: RequiredCSSProperty['padding'];
  };
}

export type ThemedCSS = FlattenInterpolation<StyledThemeProps<Theme>>;

export type ThemeProps = PropsWithChildren & {
  /**
   * @defaultValue 'Default'
   *
   * Available themes: 'Dawn', 'Default', or an object
   * that matches the type signature of Theme.
   */
  theme?: 'Dawn' | 'Default' | Theme;
};
