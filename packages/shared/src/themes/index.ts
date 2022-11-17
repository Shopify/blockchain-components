import {Dawn} from './dawn';
import {Polaris} from './polaris';

export const AvailableThemes = {
  Dawn: Dawn,
  Polaris: Polaris,
};

/**
 * A type that represents the keys of themes defined in AvailableThemes.
 *
 * @example
 * `Polaris`
 */
export type AvailableTheme = keyof typeof AvailableThemes;

/**
 * Export our themes so developers can inherit and override styles
 * if they choose to do so.
 */
export {Dawn, Polaris};
