import {vi} from 'vitest';

import {
  useTitleAndSubtitle,
  getSections,
  calculatedIsLocked,
  UtilsProps,
} from './utils';

import {
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenFixture,
  UnlockingTokenFixtureType,
  ReactionFixture,
  DiscountReactionFixture,
  TokengatePropsFixture,
  RequirementsFixture,
  ConditionFixture,
} from '~/fixtures';
import {renderHook} from '~/tests/test-utils';

const defaultTokengateProps: UtilsProps = {
  isLocked: true,
  isConnected: false,
  reaction: ReactionFixture(),
};

const defaultDiscountTokengateProps: UtilsProps = {
  isLocked: true,
  isConnected: false,
  reaction: DiscountReactionFixture(),
};

describe('Tokengate - utils', () => {
  describe('useTitleAndSubtitle', () => {
    describe('exclusive', () => {
      describe('locked', () => {
        it('returns default title and subtitle', () => {
          const {result} = renderHook(() =>
            useTitleAndSubtitle({...defaultTokengateProps}),
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
            useTitleAndSubtitle({
              ...defaultTokengateProps,
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
            useTitleAndSubtitle({
              ...defaultTokengateProps,
              isLocked: false,
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
            useTitleAndSubtitle({
              ...defaultTokengateProps,
              isLocked: false,
              exclusiveCustomTitles: {unlockedTitle, unlockedSubtitle},
            }),
          );
          expect(result.current.title).toBe(unlockedTitle);
          expect(result.current.subtitle).toBe(unlockedSubtitle);
        });

        it('returns default title and order limit subtitle if order limit is present', () => {
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultTokengateProps,
              isLocked: false,
              redemptionLimit: {
                total: 4,
                perToken: 2,
              },
              unlockingTokens: [
                UnlockingTokenWithOrderLimitFixture(),
                UnlockingTokenWithOrderLimitFixture(
                  {},
                  UnlockingTokenFixtureType.CryptoPunks,
                ),
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
            useTitleAndSubtitle({...defaultDiscountTokengateProps}),
          );

          expect(result.current.title).toBe('$10.00 holder discount');
          expect(result.current.subtitle).toBe(
            'To unlock this discount, you need:',
          );
        });

        it('correctly formats the value for fixedAmount discount type', () => {
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
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
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
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

        it('returns custom title and subtitle', () => {
          const lockedTitle = 'lockedTitle';
          const lockedSubtitle = 'lockedSubtitle';
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
              discountCustomTitles: {lockedTitle, lockedSubtitle},
            }),
          );
          expect(result.current.title).toBe(lockedTitle);
          expect(result.current.subtitle).toBe(lockedSubtitle);
        });
      });

      describe('unlocked', () => {
        it('returns default title and subtitle', () => {
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
              isLocked: false,
            }),
          );
          expect(result.current.title).toBe('$10.00 discount unlocked');
          expect(result.current.subtitle).toBe(
            'Your token got you access to this discount!',
          );
        });

        it('returns custom title and subtitle', () => {
          const unlockedTitle = 'unlockedTitle';
          const unlockedSubtitle = 'unlockedSubtitle';
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
              isLocked: false,
              discountCustomTitles: {unlockedTitle, unlockedSubtitle},
            }),
          );
          expect(result.current.title).toBe(unlockedTitle);
          expect(result.current.subtitle).toBe(unlockedSubtitle);
        });

        it('returns default title and order limit subtitle if order limit is present', () => {
          const {result} = renderHook(() =>
            useTitleAndSubtitle({
              ...defaultDiscountTokengateProps,
              isLocked: false,
              redemptionLimit: {
                total: 4,
                perToken: 2,
              },
              unlockingTokens: [
                UnlockingTokenWithOrderLimitFixture(),
                UnlockingTokenWithOrderLimitFixture(
                  {},
                  UnlockingTokenFixtureType.CryptoPunks,
                ),
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

  describe('useTokengateCardState', () => {
    it('shows requirements and connect button for locked state', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isLocked: true,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'ConnectWallet']);
    });

    it('shows requirements and connect button for unlocked state without wallet address', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isLocked: false,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'ConnectWallet']);
    });

    it('shows tokens and connected button for unlocked state', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isLocked: false,
        isConnected: true,
      });

      expect(sections).toStrictEqual(['UnlockingTokens', 'ConnectedWallet']);
    });

    it('shows requirements and connected button for missing tokens state', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isLocked: true,
        isConnected: true,
        unlockingTokens: [],
      });

      expect(sections).toStrictEqual([
        'TokengateRequirementMissingTokens',
        'ConnectedWallet',
        'MissingTokensError',
      ]);
    });

    it('shows sold out label for sold out state', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isSoldOut: true,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'SoldOut']);
    });

    it('shows requirement and available soon for future availability date state', () => {
      vi.useFakeTimers().setSystemTime(new Date('2000-01-01'));

      const sections = getSections({
        ...defaultTokengateProps,
        active: {start: '2000-01-02'},
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'AvailableSoon']);
    });
  });

  describe('calculatedIsLocked', () => {
    it('returns true when prop provided', () => {
      const isLocked = calculatedIsLocked(
        TokengatePropsFixture({isLocked: true}),
      );
      expect(isLocked).toBe(true);
    });

    it('returns false when prop provided', () => {
      const isLocked = calculatedIsLocked(
        TokengatePropsFixture({isLocked: false}),
      );
      expect(isLocked).toBe(false);
    });

    it('returns locked when no wallet connected', () => {
      const isLocked = calculatedIsLocked(
        TokengatePropsFixture({
          isConnected: false,
        }),
      );
      expect(isLocked).toBe(true);
    });

    describe('ANY logic', () => {
      const propsForAnyLogic = {
        isConnected: true,
        isLocked: undefined,
      };

      it('returns locked when no unlocking tokens provided', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAnyLogic,
            requirements: RequirementsFixture({
              logic: 'ANY',
            }),
            unlockingTokens: [],
          }),
        );
        expect(isLocked).toBe(true);
      });

      it('returns locked when the unlocking tokens do not correspond to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAnyLogic,
            requirements: RequirementsFixture({
              logic: 'ANY',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0x123',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(true);
      });

      it('returns unlocked when the unlocking token corresponds to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAnyLogic,
            requirements: RequirementsFixture({
              logic: 'ANY',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0xabc',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(false);
      });

      it('returns unlocked when the unlocking tokens corresponds to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAnyLogic,
            requirements: RequirementsFixture({
              logic: 'ANY',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
                ConditionFixture({
                  contractAddress: '0xefg',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0xefg',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(false);
      });

      it('returns locked when the unlocking tokens does not correspond to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAnyLogic,
            requirements: RequirementsFixture({
              logic: 'ANY',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
                ConditionFixture({
                  contractAddress: '0xefg',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0x123',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(true);
      });
    });

    describe('ALL logic', () => {
      const propsForAllLogic = {
        isConnected: true,
        isLocked: undefined,
      };

      it('returns locked when no unlocking tokens provided', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
            }),
            unlockingTokens: [],
          }),
        );
        expect(isLocked).toBe(true);
      });

      it('returns locked when the unlocking tokens do not correspond to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0x123',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(true);
      });

      it('returns unlocked when the unlocking token corresponds to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0xabc',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(false);
      });

      it('returns locked when not all conditions met', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
                ConditionFixture({
                  contractAddress: '0xefg',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0xefg',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(true);
      });

      it('returns unlocked when the unlocking tokens corresponds to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
                ConditionFixture({
                  contractAddress: '0xefg',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0xabc',
              }),
              UnlockingTokenFixture({
                contractAddress: '0xefg',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(false);
      });

      it('returns locked when the unlocking tokens does not correspond to the requirements', () => {
        const isLocked = calculatedIsLocked(
          TokengatePropsFixture({
            ...propsForAllLogic,
            requirements: RequirementsFixture({
              logic: 'ALL',
              conditions: [
                ConditionFixture({
                  contractAddress: '0xabc',
                }),
                ConditionFixture({
                  contractAddress: '0xefg',
                }),
              ],
            }),
            unlockingTokens: [
              UnlockingTokenFixture({
                contractAddress: '0x123',
              }),
              ConditionFixture({
                contractAddress: '0xefg',
              }),
            ],
          }),
        );
        expect(isLocked).toBe(true);
      });
    });
  });
});
