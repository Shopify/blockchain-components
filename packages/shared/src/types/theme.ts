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

  connectButton: ButtonStyle;

  modal: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    boxShadow: RequiredCSSProperty['boxShadow'];
    overlayBackground: RequiredCSSProperty['backgroundColor'];
    padding: Padding;

    borderRadius: {
      desktop: RequiredCSSProperty['borderRadius'];
      mobile: RequiredCSSProperty['borderRadius'];
    };
  };

  disabledButton: Pick<ButtonStyle, 'background' | 'textColor'>;

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

  tokengate: {
    background: RequiredCSSProperty['backgroundColor'];
    border: RequiredCSSProperty['border'];
    borderRadius: RequiredCSSProperty['borderRadius'];
    boxShadow: RequiredCSSProperty['boxShadow'];
    padding: Padding;
  };

  walletConnectorButton: ButtonStyle & {
    horizontalAlignment: RequiredCSSProperty['justifyContent'];
  };
}

export type ThemeProps = PropsWithChildren & {
  /**
   * @defaultValue 'Default'
   *
   * Available themes: 'Dawn', 'Default', or an object
   * that matches the type signature of Theme.
   */
  theme?: 'Dawn' | 'Default' | Theme;
};
