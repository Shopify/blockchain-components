import {PropsWithChildren} from 'react';
import {DefaultTheme} from 'styled-components';

import {AvailableTheme} from '../themes';

export type CustomTheme = {
  theme?: never;
  /**
   * If provided, a custom theme will be displayed. Custom themes
   * must match the `DefaultTheme` type.
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
  customTheme: DefaultTheme;
};

export type ProvidedTheme = {
  /**
   * @defaultValue
   * The default value is `Polaris` unless a `customTheme` value
   * has been provided, as custom theming will always override any
   * pre-defined themes.
   */
  theme?: AvailableTheme;
  customTheme?: never;
};

export type ThemeProps = PropsWithChildren<CustomTheme | ProvidedTheme>;
