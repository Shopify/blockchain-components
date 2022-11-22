import {PropsWithChildren} from 'react';
import {DefaultTheme} from 'styled-components';

import {AvailableThemes} from '../themes';

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
  customTheme?: DefaultTheme;
};
