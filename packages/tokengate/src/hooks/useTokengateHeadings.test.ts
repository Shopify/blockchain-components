import {
  useTokengateHeadings,
  UseTokengateHeadingsProps,
} from './useTokengateHeadings';

import {
  DiscountReactionFixture,
  ReactionFixture,
  UnlockingTokenFixtureType,
  UnlockingTokenWithOrderLimitFixture,
} from '~/fixtures';
import {renderHook} from '~/tests/test-utils';

const defaultExclusiveProps: UseTokengateHeadingsProps = {
  locked: true,
  reaction: ReactionFixture(),
};

const defaultDiscountProps: UseTokengateHeadingsProps = {
  locked: true,
  reaction: DiscountReactionFixture(),
};

describe('useTokengateHeadings', () => {
  describe('exclusive', () => {
    describe('locked', () => {
      it('returns default title and subtitle', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({...defaultExclusiveProps}),
        );

        expect(result.current.title).toBe('Holder exclusive');
        expect(result.current.subtitle).toBe(
          'To unlock this product, you need:',
        );
      });

      it('returns custom title and subtitle', () => {
        const lockedTitle = 'lockedTitle';
        const lockedSubtitle = 'lockedSubtitle';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultExclusiveProps,
            exclusiveCustomTitles: {lockedTitle, lockedSubtitle},
          }),
        );

        expect(result.current.title).toBe(lockedTitle);
        expect(result.current.subtitle).toBe(lockedSubtitle);
      });
    });

    describe('unlocked', () => {
      it('returns default title and subtitle', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultExclusiveProps,
            locked: false,
          }),
        );

        expect(result.current.title).toBe('Exclusive unlocked');
        expect(result.current.subtitle).toBe(
          'Your token got you access to this product!',
        );
      });

      it('returns custom title and subtitle', () => {
        const unlockedTitle = 'unlockedTitle';
        const unlockedSubtitle = 'unlockedSubtitle';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultExclusiveProps,
            locked: false,
            exclusiveCustomTitles: {unlockedTitle, unlockedSubtitle},
          }),
        );

        expect(result.current.title).toBe(unlockedTitle);
        expect(result.current.subtitle).toBe(unlockedSubtitle);
      });

      it('returns default title and order limit subtitle if order limit is present', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultExclusiveProps,
            locked: false,
            redemptionLimit: {
              total: 4,
              perToken: 2,
            },
            unlockingTokens: [
              UnlockingTokenWithOrderLimitFixture({}),
              UnlockingTokenWithOrderLimitFixture({
                type: UnlockingTokenFixtureType.CryptoPunks,
              }),
            ],
          }),
        );

        expect(result.current.title).toBe('Exclusive unlocked');
        expect(result.current.subtitle).toBe(
          'You can buy up to 4 with your tokens.',
        );
      });
    });
  });

  describe('discount', () => {
    describe('locked', () => {
      it('returns default title and subtitle', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({...defaultDiscountProps}),
        );

        expect(result.current.title).toBe('$10.00 holder discount');
        expect(result.current.subtitle).toBe(
          'To unlock this discount, you need:',
        );
      });

      it('correctly formats the value for fixedAmount discount type', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            reaction: DiscountReactionFixture({
              discount: {
                type: 'fixedAmount',
                value: '10.0',
              },
            }),
          }),
        );

        expect(result.current.title).toBe('$10.00 holder discount');
        expect(result.current.subtitle).toBe(
          'To unlock this discount, you need:',
        );
      });

      it('correctly formats the value for percentage discount type', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            reaction: DiscountReactionFixture({
              discount: {
                type: 'percentage',
                value: '10.0',
              },
            }),
          }),
        );

        expect(result.current.title).toBe('10% holder discount');
        expect(result.current.subtitle).toBe(
          'To unlock this discount, you need:',
        );
      });

      it('returns custom title and subtitle without dynamic values', () => {
        const lockedTitle = 'lockedTitle';
        const lockedSubtitle = 'lockedSubtitle';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            discountCustomTitles: {lockedTitle, lockedSubtitle},
          }),
        );

        expect(result.current.title).toBe(lockedTitle);
        expect(result.current.subtitle).toBe(lockedSubtitle);
      });

      it('returns custom title with dynamic values', () => {
        const lockedTitle = 'Special {{value}} discount for holders';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            discountCustomTitles: {lockedTitle},
            reaction: DiscountReactionFixture({
              discount: {
                type: 'fixedAmount',
                value: '10.0',
              },
            }),
          }),
        );

        expect(result.current.title).toBe(
          'Special $10.00 discount for holders',
        );
      });
    });

    describe('unlocked', () => {
      it('returns default title and subtitle', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            locked: false,
          }),
        );

        expect(result.current.title).toBe('$10.00 discount unlocked');
        expect(result.current.subtitle).toBe(
          'Your token got you access to this discount!',
        );
      });

      it('returns custom title and subtitle without dynamic values', () => {
        const unlockedTitle = 'unlockedTitle';
        const unlockedSubtitle = 'unlockedSubtitle';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            locked: false,
            discountCustomTitles: {unlockedTitle, unlockedSubtitle},
          }),
        );

        expect(result.current.title).toBe(unlockedTitle);
        expect(result.current.subtitle).toBe(unlockedSubtitle);
      });

      it('returns custom title with dynamic values', () => {
        const unlockedTitle =
          'You unlocked the holders only {{value}} discount';

        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            locked: false,
            discountCustomTitles: {unlockedTitle},
            reaction: DiscountReactionFixture({
              discount: {
                type: 'fixedAmount',
                value: '10.0',
              },
            }),
          }),
        );

        expect(result.current.title).toBe(
          'You unlocked the holders only $10.00 discount',
        );
      });

      it('returns default title and order limit subtitle if order limit is present', () => {
        const {result} = renderHook(() =>
          useTokengateHeadings({
            ...defaultDiscountProps,
            locked: false,
            redemptionLimit: {
              total: 4,
              perToken: 2,
            },
            unlockingTokens: [
              UnlockingTokenWithOrderLimitFixture({}),
              UnlockingTokenWithOrderLimitFixture({
                type: UnlockingTokenFixtureType.CryptoPunks,
              }),
            ],
          }),
        );

        expect(result.current.title).toBe('$10.00 discount unlocked');
        expect(result.current.subtitle).toBe(
          'You can use this discount up to 4 times with your tokens.',
        );
      });
    });
  });
});
