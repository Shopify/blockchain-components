import {deepMerge, DeepPartial} from 'shared';

import {Requirements} from '../types';

import {ConditionArrayFixture} from './Condition';

export const RequirementsFixture = (customProps?: DeepPartial<Requirements>) =>
  deepMerge(
    {
      logic: 'ANY' as const,
      conditions: ConditionArrayFixture(),
    },
    customProps ?? {},
  ) as Requirements;
