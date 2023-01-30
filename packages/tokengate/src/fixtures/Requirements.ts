import {deepMerge} from 'shared/src/utils/deepMerge';
import {DeepPartial} from 'shared/src/types/deepPartial';

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
