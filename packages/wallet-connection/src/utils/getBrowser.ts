import {UAParser} from 'ua-parser-js';

import {Browser} from '../types/browser';

const USERAGENT = navigator.userAgent;
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

export const getBrowserInfo = (): BrowserInfo => {
  try {
    // Brave is a bit different and not supported at the moment by UAParser, so we'll check for that manually.
    // https://github.com/microsoft/TypeScript/issues/41532
    // https://github.com/brave/brave-browser/issues/10165#issuecomment-641128278
    // @ts-ignore-next-line
    const isBrave = navigator.brave && navigator.brave.isBrave();
    const parser = new UAParser(USERAGENT);
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
    console.error('Error detcting browser.');
    return {
      browser: Browser.Unknown,
      mobilePlatform: undefined,
    };
  }
};
