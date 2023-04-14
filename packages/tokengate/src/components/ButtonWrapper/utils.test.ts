import {vi} from 'vitest';

import {getYearFormatOption} from './utils';

describe('ButtonWrapper/utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns undefined when the year provided is the current year', () => {
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);

    const dateToUse = new Date(2000, 2, 2, 1).toISOString();

    expect(getYearFormatOption(dateToUse)).toStrictEqual(undefined);
  });

  it('returns undefined when the date provided is in the following year and less than 3 months from current date', () => {
    const date = new Date(2000, 9, 4);
    vi.setSystemTime(date);

    const dateToUse = new Date(2001, 0, 1).toISOString();

    expect(getYearFormatOption(dateToUse)).toStrictEqual(undefined);
  });

  it('returns numeric when the date provided is in the following year and more than 3 months from current date', () => {
    const date = new Date(2000, 8, 1);
    vi.setSystemTime(date);

    const dateToUse = new Date(2001, 0, 1).toISOString();

    expect(getYearFormatOption(dateToUse)).toStrictEqual('numeric');
  });
});
