import {PropsWithChildren} from 'react';

import {AvailableThemes} from '../themes';

export type Padding =
  | string
  | {
      top: string;
      left: string;
      right: string;
      bottom: string;
    };

export interface ButtonStyle {
  background: string;
  border: string;
  borderRadius: string;
  boxShadow: string;
  padding: Padding;
  textColor: string;

  hover: {
    background?: string;
    outline?: string;
  };
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
  name: string;
  typography: {
    colorPrimary: string;
    colorSecondary: string;
    colorInteractive: string;
    colorCritical: string;
    letterSpacing: string;

    heading: {
      fontFamily: string;
      fontWeight: string;

      h1: {
        fontSize: string;
        lineHeight: string;
      };

      h2: {
        fontSize: string;
        lineHeight: string;
      };

      h3: {
        fontSize: string;
        lineHeight: string;
      };
    };

    body: FontStyle;
  };

  availableSoonButton: {
    background: string;
    border: string;
  };

  connectButton: ButtonStyle;

  modal: {
    background: string;
    overlayBackground: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    padding: Padding;
  };

  other: {
    iconColor: string;
    dividerColor: string;
  };

  popovers: {
    background: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
  };

  secondaryButton: ButtonStyle;

  soldOutButton: {
    background: string;
    border: string;
    textColor: string;
  };

  tokenBase: {
    background: string;
    textColor: string;
  };

  walletConnectorButton: ButtonStyle & {
    horizontalAlignment: string;
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
