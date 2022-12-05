import {getTitleAndSubtitle, getSections} from './utils';

const defaultTokengatingCardProps = {
  isLocked: true,
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

describe('TokengatingCard - utils', () => {
  describe('getTitleAndSubtitle', () => {
    it('returns default locked title and subtitle', () => {
      const {title, subtitle} = getTitleAndSubtitle({
        ...defaultTokengatingCardProps,
      });
      expect(title).toBe('Holder exclusive');
      expect(subtitle).toBe('To unlock this product, you need:');
    });

    it('returns custom locked title and subtitle', () => {
      const lockedTitle = 'lockedTitle';
      const lockedSubtitle = 'lockedSubtitle';
      const {title, subtitle} = getTitleAndSubtitle({
        ...defaultTokengatingCardProps,
        lockedTitle,
        lockedSubtitle,
      });
      expect(title).toBe(lockedTitle);
      expect(subtitle).toBe(lockedSubtitle);
    });

    it('returns default unlocked title and subtitle', () => {
      const {title, subtitle} = getTitleAndSubtitle({
        ...defaultTokengatingCardProps,
        isLocked: false,
      });
      expect(title).toBe('Exclusive unlocked');
      expect(subtitle).toBe('Your token got you access to this product!');
    });

    it('returns custom unlocked title and subtitle', () => {
      const unlockedTitle = 'unlockedTitle';
      const unlockedSubtitle = 'unlockedSubtitle';
      const {title, subtitle} = getTitleAndSubtitle({
        ...defaultTokengatingCardProps,
        isLocked: false,
        unlockedTitle,
        unlockedSubtitle,
      });
      expect(title).toBe(unlockedTitle);
      expect(subtitle).toBe(unlockedSubtitle);
    });
  });

  describe('useTokengateCardState', () => {
    it('shows requirements and connect button for locked state', () => {
      const sections = getSections({
        ...defaultTokengatingCardProps,
        isLocked: true,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'ConnectWallet']);
    });

    it('shows requirements and connect button for unlocked state without wallet address', () => {
      const sections = getSections({
        ...defaultTokengatingCardProps,
        isLocked: false,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'ConnectWallet']);
    });

    it('shows tokens and connected button for unlocked state', () => {
      const sections = getSections({
        ...defaultTokengatingCardProps,
        isLocked: false,
        wallet: {
          address: '0x0',
        },
      });

      expect(sections).toStrictEqual(['UnlockingTokens', 'ConnectedWallet']);
    });

    it('shows requirements and connected button for missing tokens state', () => {
      const sections = getSections({
        ...defaultTokengatingCardProps,
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
        ...defaultTokengatingCardProps,
        isSoldOut: true,
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'SoldOut']);
    });

    it('shows requirement and available soon for future availability date state', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01'));

      const sections = getSections({
        ...defaultTokengatingCardProps,
        availableDate: '2000-01-02',
      });

      expect(sections).toStrictEqual(['TokengateRequirement', 'AvailableSoon']);
    });
  });
});
