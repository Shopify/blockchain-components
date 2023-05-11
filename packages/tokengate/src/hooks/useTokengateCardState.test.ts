import {vi} from 'vitest';

import {
  useTokengateCardState,
  UseTokengateCardStateProps,
} from './useTokengateCardState';

import {ReactionFixture} from '~/fixtures';
import {renderHook} from '~/tests/test-utils';

const defaultTokengateProps: UseTokengateCardStateProps = {
  isLocked: true,
  isConnected: false,
  reaction: ReactionFixture(),
};

describe('useTokengateCardState', () => {
  it('shows requirements and connect button for locked state', () => {
    const sections = getSections({...defaultTokengateProps, isLocked: true});

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

const getSections = (props: UseTokengateCardStateProps) => {
  const {result} = renderHook(() => useTokengateCardState(props));

  return result.current.sections;
};
