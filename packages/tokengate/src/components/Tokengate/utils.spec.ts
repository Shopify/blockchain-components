import {
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenFixtureType,
} from '../../fixtures';

import {getTitleAndSubtitle, getSections} from './utils';
import {TokengateProps} from './types';

const defaultTokengateProps: TokengateProps = {
  connectButton: null,
  isLocked: true,
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

describe('Tokengate - utils', () => {
  describe('getTitleAndSubtitle', () => {
    describe('locked', () => {
      it('returns default title and subtitle', () => {
        const {title, subtitle} = getTitleAndSubtitle({
          ...defaultTokengateProps,
        });
        expect(title).toBe('Holder exclusive');
        expect(subtitle).toBe('To unlock this product, you need:');
      });

      it('returns custom title and subtitle', () => {
        const lockedTitle = 'lockedTitle';
        const lockedSubtitle = 'lockedSubtitle';
        const {title, subtitle} = getTitleAndSubtitle({
          ...defaultTokengateProps,
          exclusiveCustomTitles: {lockedTitle, lockedSubtitle},
        });
        expect(title).toBe(lockedTitle);
        expect(subtitle).toBe(lockedSubtitle);
      });
    });

    describe('unlocked', () => {
      it('returns default title and subtitle', () => {
        const {title, subtitle} = getTitleAndSubtitle({
          ...defaultTokengateProps,
          isLocked: false,
        });
        expect(title).toBe('Exclusive unlocked');
        expect(subtitle).toBe('Your token got you access to this product!');
      });

      it('returns custom title and subtitle', () => {
        const unlockedTitle = 'unlockedTitle';
        const unlockedSubtitle = 'unlockedSubtitle';
        const {title, subtitle} = getTitleAndSubtitle({
          ...defaultTokengateProps,
          isLocked: false,
          exclusiveCustomTitles: {unlockedTitle, unlockedSubtitle},
        });
        expect(title).toBe(unlockedTitle);
        expect(subtitle).toBe(unlockedSubtitle);
      });

      it('returns default title and order limit subtitle if order limit is present', () => {
        const {title, subtitle} = getTitleAndSubtitle({
          ...defaultTokengateProps,
          isLocked: false,
          unlockingTokens: [
            UnlockingTokenWithOrderLimitFixture(),
            UnlockingTokenWithOrderLimitFixture(
              {},
              UnlockingTokenFixtureType.Squaddy,
            ),
          ],
        });
        expect(title).toBe('Exclusive unlocked');
        expect(subtitle).toBe('You can buy up to 4 with your tokens.');
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
