import {deepMerge} from './deepMerge';

describe('deepMerge', () => {
  it('merges keys in first level', () => {
    const originalObject = {
      key1: 'key1',
      key2: 'key2',
    };
    const result = deepMerge(originalObject, {
      key2: 'newKey2',
    });
    expect(result).toStrictEqual({
      key1: 'key1',
      key2: 'newKey2',
    });
  });

  it('merges keys in deeper levels', () => {
    const originalObject = {
      key1: 'key1',
      key2: {
        key1: 'key2-1',
        key2: 'key2-2',
      },
    };
    const result = deepMerge(originalObject, {
      key2: {
        key1: 'newKey2-1',
      },
    });
    expect(result).toStrictEqual({
      key1: 'key1',
      key2: {
        key1: 'newKey2-1',
        key2: 'key2-2',
      },
    });
  });

  it('replaces arrays in deeper levels', () => {
    const originalObject = {
      key1: 'key1',
      key2: ['element1', 'element2'],
    };
    const result = deepMerge(originalObject, {
      key2: ['element3'],
    });
    expect(result).toStrictEqual({
      key1: 'key1',
      key2: ['element3'],
    });
  });

  it('replaces arrays in first level', () => {
    const originalObject = {
      key1: 'key1',
      key2: {
        key1: ['element1', 'element2'],
        key2: 'key2-2',
      },
    };
    const result = deepMerge(originalObject, {
      key2: {
        key1: ['element3'],
      },
    });
    expect(result).toStrictEqual({
      key1: 'key1',
      key2: {
        key1: ['element3'],
        key2: 'key2-2',
      },
    });
  });
});
