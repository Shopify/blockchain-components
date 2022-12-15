import {Button} from 'shared';

import {getBrowserInfo} from '../utils/getBrowser';
import {isInstalled} from '../utils/isInstalled';

import {useAppSelector} from './useAppState';

/**
 * A utility hook for conditionally displaying download links for browser extensions + mobile apps.
 */
export function useConnectorDownloadLinks() {
  const {pendingConnector} = useAppSelector((state) => state.wallet);

  const {browser, mobilePlatform} = getBrowserInfo();

  const getMobileOSButton = (platform: 'Android' | 'iOS') => {
    const platformAppStoreLink = pendingConnector?.mobileApps?.[platform];

    if (!pendingConnector || !platformAppStoreLink) {
      return null;
    }

    const labelPrefix = mobilePlatform ? 'Open' : 'Get';
    const labelSuffix = mobilePlatform ? '' : ` for ${platform}`;

    return (
      <Button
        label={`${labelPrefix} ${pendingConnector.name} ${labelSuffix}`}
        link={{href: platformAppStoreLink, target: '_blank'}}
      />
    );
  };

  if (
    !pendingConnector ||
    (!pendingConnector.browserExtensions && !pendingConnector.mobileApps)
  ) {
    return null;
  }

  const {browserExtensions, name} = pendingConnector;
  const extensionInstalled = isInstalled(name);
  const browserExtensionLink = browserExtensions?.[browser];
  const browserExtensionLabel = `Get the ${name} extension`;
  const browserExtensionButton =
    browserExtensionLink && !extensionInstalled ? (
      <Button
        label={browserExtensionLabel}
        link={{href: browserExtensionLink, target: '_blank'}}
      />
    ) : null;

  const androidButton = getMobileOSButton('Android');
  const iOSButton = getMobileOSButton('iOS');

  // We're only going to render a download link by itself
  // on mobile devices.
  if (mobilePlatform === 'Android') {
    return androidButton;
  }

  if (mobilePlatform === 'iOS') {
    return iOSButton;
  }

  // Wrapping this in a fragment because we render the walletConnect
  // button conditionally and always wrap the button components in a
  // ButtonContainer in the screens.
  return (
    <>
      {androidButton}
      {iOSButton}
      {browserExtensionButton}
    </>
  );
}
