import {getConditionTitle} from './utils';

describe('getConditionTitle', () => {
  it('returns the name when available', () => {
    expect(getConditionTitle({name: 'foo'})).toBe('foo');
  });

  it('returns the formatted contract address when available', () => {
    expect(getConditionTitle({contractAddress: '0x1234567890'})).toBe(
      'contract 0x12...7890',
    );
  });

  it('returns blank string when no name or contract address', () => {
    expect(getConditionTitle({})).toBe('');
  });
});
