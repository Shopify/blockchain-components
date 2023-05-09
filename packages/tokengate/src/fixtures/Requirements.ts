import {deepMerge, DeepPartial} from 'shared';

import {ConditionArrayFixture} from './Condition';

import {Requirements} from '~/types';

export const RequirementsFixture = (customProps?: DeepPartial<Requirements>) =>
  deepMerge(
    {
      logic: 'ANY' as const,
      conditions: ConditionArrayFixture(),
    },
    customProps ?? {},
  ) as Requirements;
