import {getTitleAndSubtitle} from './utils';

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
  });
});
