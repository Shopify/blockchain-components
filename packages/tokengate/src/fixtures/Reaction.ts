import {deepMerge, DeepPartial} from 'shared';

import {Reaction} from '~/types';

export const ReactionFixture = (customProps?: DeepPartial<Reaction>) =>
  deepMerge(
    {
      type: 'exclusive_access',
    },
    customProps ?? {},
  ) as Reaction;

export const DiscountReactionFixture = (customProps?: DeepPartial<Reaction>) =>
  deepMerge(
    {
      type: 'discount',
      discount: {
        type: 'fixedAmount',
        value: 10,
      },
    },
    customProps ?? {},
  ) as Reaction;
