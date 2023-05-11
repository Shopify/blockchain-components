interface DiscountReaction {
  type: 'discount';
  discount: {
    type: 'fixedAmount' | 'percentage';
    value: number | string;
  };
}

interface ExclusiveAccessReaction {
  type: 'exclusive_access';
  discount?: never;
}

export type Reaction = DiscountReaction | ExclusiveAccessReaction;
