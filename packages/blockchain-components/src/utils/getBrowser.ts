import {UAParser} from 'ua-parser-js';

import {Browser} from '../types/browser';

// A list of supported browser marketplaces that we can
// provide links to marketplaces for.
const SUPPORTED_BROWSERS = [
  Browser.Brave,
  Browser.Chrome,
  Browser.Edge,
  Browser.Firefox,
  Browser.Opera,
];

export interface BrowserInfo {
  browser: Browser;
  mobilePlatform: string | undefined;
}

const DEFAULT_BROWSER_INFO: BrowserInfo = {
  browser: Browser.Unknown,
  mobilePlatform: undefined,
};

export const getBrowserInfo = (): BrowserInfo => {
  try {
    /**
     * TS believes that navigator is always defined
     * which is true outside of the context of SSR.
     */
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!navigator) {
      return DEFAULT_BROWSER_INFO;
    }

    // Brave is a bit different and not supported at the moment by UAParser, so we'll check for that manually.
    // https://github.com/microsoft/TypeScript/issues/41532
    // https://github.com/brave/brave-browser/issues/10165#issuecomment-641128278
    // @ts-ignore-next-line
    const isBrave = navigator.brave && navigator.brave.isBrave();
    const parser = new UAParser(navigator.userAgent);
    const {browser, os} = parser.getResult();
    const isMobile = os.name === 'Android' || os.name === 'iOS';

    if (isBrave) {
      return {
        browser: Browser.Brave,
        mobilePlatform: isMobile ? os.name : undefined,
      };
    }

    const browserKey = SUPPORTED_BROWSERS.find(
      (key) => key.valueOf() === browser.name,
    );

    return {
      browser: browserKey || Browser.Unknown,
      mobilePlatform: isMobile ? os.name : undefined,
    };
  } catch (error) {
    return DEFAULT_BROWSER_INFO;
  }
};
