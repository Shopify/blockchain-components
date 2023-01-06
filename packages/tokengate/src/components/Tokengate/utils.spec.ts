import {
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenFixtureType,
} from '../../fixtures';
import {renderHook} from '../../tests/test-utils';

import {useTitleAndSubtitle, getSections} from './utils';
import {TokengateProps} from './types';

const defaultTokengateProps: TokengateProps = {
  connectButton: null,
  isLocked: true,
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

const defaultDiscountTokengateProps: TokengateProps = {
  connectButton: null,
  isLocked: true,
  discount: 10,
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
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
              unlockingTokens: [
                UnlockingTokenWithOrderLimitFixture(),
                UnlockingTokenWithOrderLimitFixture(
                  {},
                  UnlockingTokenFixtureType.Squaddy,
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

          expect(result.current.title).toBe('10$ holder discount');
          expect(result.current.subtitle).toBe(
            'To unlock this product, you need:',
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
          expect(result.current.title).toBe('Exclusive unlocked');
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
              unlockingTokens: [
                UnlockingTokenWithOrderLimitFixture(),
                UnlockingTokenWithOrderLimitFixture(
                  {},
                  UnlockingTokenFixtureType.Squaddy,
                ),
              ],
            }),
          );
          expect(result.current.title).toBe('Exclusive unlocked');
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
        wallet: {
          address: '0x0',
        },
      });

      expect(sections).toStrictEqual(['UnlockingTokens', 'ConnectedWallet']);
    });

    it('shows requirements and connected button for missing tokens state', () => {
      const sections = getSections({
        ...defaultTokengateProps,
        isLocked: true,
        wallet: {
          address: '0x0',
        },
        unlockingTokens: [],
      });

      expect(sections).toStrictEqual([
        'TokengateRequirementMissingTokens',
        'ConnectedWallet',
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
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01'));

      const sections = getSections({
        ...defaultTokengateProps,
        availableDate: '2000-01-02',
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'AvailableSoon']);
    });
  });
});
