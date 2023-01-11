import {PropsWithChildren} from 'react';
import {CSSProperties} from 'styled-components';

import {AvailableThemes} from '../themes';

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

/**
 * A type that represents the keys of themes defined in AvailableThemes.
 *
 * @example
 * `Polaris`
 */
export type AvailableTheme = keyof typeof AvailableThemes;

export type ThemeProps = PropsWithChildren & {
  /**
   * @defaultValue
   * The default value is `Polaris` unless a `customTheme` value
   * has been provided, as custom theming will always override any
   * pre-defined themes.
   */
  theme?: AvailableTheme;
  /**
   * If provided, a custom theme will be displayed. Custom themes
   * must match the `Theme` type.
   *
   * Themes can also extend defined themes, which are also
   * exported from the `shared/themes/` directory.
   *
   * ### Custom theme
   * @example
   * customTheme={{
   *    connectButton: {
   *        background: '#008060',
   *        ...,
   *    }, ...
   * }}
   *
   * ### Inherited and overwritten theme
   * @example
   * customTheme={{
   *    ...Dawn,
   *    connectButton: {
   *        ...Dawn.connectButton,
   *        background: '#008060',
   *    }
   * }}
   */
  customTheme?: Theme;
};
