import {useCallback} from 'react';
import {Button} from 'shared';

import {getConnectorData} from '../constants/connectors';
import {getBrowserInfo} from '../utils/getBrowser';
import {isInstalled} from '../utils/isInstalled';

/**
 * A utility hook for conditionally displaying download links for browser extensions + mobile apps.
 */
export function useConnectorDownloadLinks(connectorName?: string) {
  const {browser, mobilePlatform} = getBrowserInfo();
  const {browserExtensions, mobileApps, name} = getConnectorData(connectorName);
  const extensionInstalled = isInstalled(name);

  if (!browserExtensions && !mobileApps) {
    return null;
  }

  const handleButtonClick = useCallback((link: string) => {
    // Wrapping in a try/catch in the event that window is undefined.
    try {
      window.open(link, '_blank')?.focus();
    } catch (exception) {
      console.error('Failed to open link in new window');
    }
  }, []);

  const browserExtensionLink = browserExtensions?.[browser];
  const browserExtensionLabel = `Get the ${name} extension`;

  const browserExtensionButton =
    browserExtensionLink && !extensionInstalled ? (
      <Button
        label={browserExtensionLabel}
        onClick={() => handleButtonClick(browserExtensionLink)}
        // TO DO: link={{href: browserExtensionLink, target: '_blank'}}
      />
    ) : null;

  const androidDownloadLink = mobileApps?.Android || undefined;
  const iOSDownloadLink = mobileApps?.iOS || undefined;

  const mobileAppDownloadLabel = `Get the ${name} app`;

  const androidDownloadButton = androidDownloadLink ? (
    <Button
      label={
        mobilePlatform
          ? mobileAppDownloadLabel
          : `Get the ${name} app for Android`
      }
      onClick={() => handleButtonClick(androidDownloadLink)}
    />
  ) : null;

  const iOSDownloadButton = iOSDownloadLink ? (
    <Button
      label={
        mobilePlatform ? mobileAppDownloadLabel : `Get the ${name} app for iOS`
      }
      onClick={() => handleButtonClick(iOSDownloadLink)}
    />
  ) : null;

  // We're only going to render a download link by itself
  // on mobile devices.
  if (mobilePlatform === 'Android') {
    return androidDownloadButton;
  }

  if (mobilePlatform === 'iOS') {
    return iOSDownloadButton;
  }

  // Wrapping this in a fragment because we render the walletConnect
  // button conditionally and always wrap the button components in a
  // ButtonContainer in the screens.
  return (
    <>
      {androidDownloadButton}
      {iOSDownloadButton}
      {browserExtensionButton}
    </>
  );
}
