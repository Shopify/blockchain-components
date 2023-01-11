import {PropsWithChildren} from 'react';
import {CSSProperties} from 'styled-components';

type RequiredCSSProperty = Required<CSSProperties>;

export type Padding =
  | RequiredCSSProperty['padding']
  | {
      top: RequiredCSSProperty['paddingTop'];
      left: RequiredCSSProperty['paddingLeft'];
      right: RequiredCSSProperty['paddingRight'];
      bottom: RequiredCSSProperty['paddingBottom'];
    };

export interface ButtonStyle {
  background: RequiredCSSProperty['backgroundColor'];
  border: RequiredCSSProperty['border'];
  borderRadius: RequiredCSSProperty['borderRadius'];
  boxShadow: RequiredCSSProperty['boxShadow'];
  padding: Padding;
  textColor: RequiredCSSProperty['color'];

  hover: {
    // The following are optional properties
    background?: CSSProperties['backgroundColor'];
    outline?: CSSProperties['outline'];
  };
}

interface FontVariantProp {
  fontSize: RequiredCSSProperty['fontSize'];
  lineHeight: RequiredCSSProperty['lineHeight'];
}

export interface FontStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;

  bold: {
    fontWeight: string;
  };
}

export interface Theme {
  typography: {
    colorPrimary: RequiredCSSProperty['color'];
    colorSecondary: RequiredCSSProperty['color'];
    colorCritical: RequiredCSSProperty['color'];
    colorDisabled: RequiredCSSProperty['color'];
    letterSpacing: RequiredCSSProperty['letterSpacing'];

    heading: {
      fontFamily: RequiredCSSProperty['fontFamily'];
      fontWeight: RequiredCSSProperty['fontWeight'];

      h1: FontVariantProp;
      h2: FontVariantProp;
      h3: FontVariantProp;
    };

    body: FontStyle;
  };

  connectButton: ButtonStyle & {
    backgroundDisabled: RequiredCSSProperty['backgroundColor'];
  };

  modal: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    borderRadius: RequiredCSSProperty['borderRadius'];
    boxShadow: RequiredCSSProperty['boxShadow'];
    overlayBackground: RequiredCSSProperty['backgroundColor'];
    padding: Padding;
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

  secondaryButton: ButtonStyle;

  walletConnectorButton: ButtonStyle & {
    horizontalAlignment: RequiredCSSProperty['justifyContent'];
  };
}

export type ThemeProps = PropsWithChildren & {
  /**
   * @defaultValue 'Dawn'
   *
   * Available themes: 'Dawn', 'Polaris', or an object
   * that matches the type signature of Theme.
   */
  theme?: 'Dawn' | 'Polaris' | Theme;
};
