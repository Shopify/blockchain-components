import {getClientBrowserParameters} from './utils';

describe('clientBrowserParameters - utils', () => {
  const originalDocument = document;

  afterEach(() => {
    // eslint-disable-next-line no-global-assign
    document = originalDocument;
  });

  describe('getClientBrowserParameters', () => {
    it('errors and returns empty object when executed on server side', () => {
      // Casting document as any so that it can be overwritten to undefined to mock SSR
      // eslint-disable-next-line no-global-assign
      (document as any) = undefined;
      const browserParams = getClientBrowserParameters();

      expect(browserParams).toEqual({
        uniqueToken: '',
        visitToken: '',
        url: '',
        path: '',
        search: '',
        referrer: '',
        title: '',
        userAgent: '',
      });
    });

    it('returns browser parameters when executed on client side', () => {
      // Casting document as any so that we can assign only the values that we need for the test
      // eslint-disable-next-line no-global-assign
      (document as any) = {
        title: 'test',
        referrer: 'https://www.example.com',
        cookie: '_shopify_y=abc123; _shopify_s=def456',
      };

      const browserParams = getClientBrowserParameters();

      expect(browserParams).toEqual({
        uniqueToken: 'abc123',
        visitToken: 'def456',
        url: expect.any(String),
        path: expect.any(String),
        search: '',
        referrer: 'https://www.example.com',
        title: 'test',
        userAgent: expect.any(String),
      });
    });
  });
});
