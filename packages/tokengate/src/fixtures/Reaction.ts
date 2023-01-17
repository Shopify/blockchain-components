import {deepMerge} from 'shared/src/utils/deepMerge';
import {DeepPartial} from 'shared/src/types/deepPartial';
import {Reaction} from 'types';

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
        type: 'amount',
        value: 10,
      },
    },
    customProps ?? {},
  ) as Reaction;
