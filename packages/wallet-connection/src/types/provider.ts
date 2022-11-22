import {ThemeProps} from 'shared';

import type {AtLeastOne} from './generics';

interface Providers {
  alchemyApiKey?: string;
  infuraApiKey?: string;
}

type WithAtLeastOneProvider = AtLeastOne<Providers>;

type WithENSResolution = WithAtLeastOneProvider & {
  ensResolution: true;
};

type WithoutENSResolution = Providers & {
  ensResolution?: never;
};

/**
 * If a developer chooses to enable ENS resolution, we require that either
 * an Alchemy or Infura provider api key are provided to ensure that the storefront
 * does not get rate limited and degrade merchant conversion.
 */
type MutuallyExclusiveENSResolution = WithENSResolution | WithoutENSResolution;

export type ProviderProps = ThemeProps & MutuallyExclusiveENSResolution;
