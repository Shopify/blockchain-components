import {Dawn} from './dawn';
import {Polaris} from './polaris';

export const AvailableThemes = {
  Dawn: Dawn,
  Polaris: Polaris,
};

/**
 * Export our themes so developers can inherit and override styles
 * if they choose to do so.
 */
export {Dawn, Polaris};
