import {useCallback} from 'react';

import {Browser} from '../types/browser';
import {Connector} from '../types/connector';
import {cleanupConnection} from '../utils/cleanupConnection';
import {getBrowserInfo} from '../utils/getBrowser';

interface ItemProps {
  href: string;
  name: string;
}

// WalletConnect relies on this as the key for deeplinking.
const STORAGE_KEY = 'WALLETCONNECT_DEEPLINK_CHOICE';

const setKey = ({href, name}: ItemProps) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      href: href.split('?')[0],
      name,
    }),
  );
};

export function useWalletConnectDeeplink() {
  const {browser, mobilePlatform} = getBrowserInfo();

  const deleteKey = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const connectUsingWalletConnect = useCallback(
    (connector: Connector) => {
      /**
       * Since we're sharing the WalletConnect connectors we need to
       * ensure that when calling this function it hasn't already
       * attached event listeners.
       */
      let invoked = false;

      const {
        connector: wagmiConnector,
        desktopAppLink,
        mobileAppPrefixes,
        name,
      } = connector;

      let prefix = '';

      if (desktopAppLink && !mobilePlatform) {
        prefix = desktopAppLink;
      }

      if (mobileAppPrefixes && mobilePlatform) {
        // Check to see if the prefix exists for the given platform.
        const locatedPrefix = mobileAppPrefixes[mobilePlatform];

        if (locatedPrefix) prefix = locatedPrefix;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        wagmiConnector.on('message', async () => {
          if (invoked) {
            return;
          }

          // Set invoked to true to prevent duplicat event listeners from being attached.
          invoked = true;

          const provider = await wagmiConnector.getProvider();
          const {uri} = provider.connector;
          const suffix =
            mobilePlatform === 'Android' ? uri : encodeURIComponent(uri);
          const deeplinkUri = `${prefix}${suffix}`;

          if (mobilePlatform) {
            setKey({href: deeplinkUri, name});

            // This addresses an issue with hanging tabs for iOS.
            if (deeplinkUri.startsWith('http')) {
              const link = document.createElement('a');
              link.href = deeplinkUri;
              link.target = '_blank';
              link.rel = 'noreferrer noopener';
              link.click();
            } else {
              window.location.href = deeplinkUri;
            }
          } else {
            /**
             * There is a slight UX gap here where if the user is on desktop
             * and doesn't have Ledger Live installed. What happens is the
             * attempt to deeplink will fail and the user will be stuck on the
             * connecting screen. Unfortunately, there is not a good way to detect
             * custom app protocol support in the browser that isn't hacky.
             */
            window.open(
              deeplinkUri,
              browser === Browser.Safari ? '_blank' : '_self',
            );
          }

          cleanupConnection(provider);
        });
      } catch (error) {
        console.error(
          'Caught exception while attempting to open WalletConnect URI',
        );
      }
    },
    [browser, mobilePlatform],
  );

  return {
    connectUsingWalletConnect,
    deleteKey,
  };
}
