import {Button} from 'shared';

import {useWalletConnection} from '../providers/WalletConnectionProvider';
import {getBrowserInfo} from '../utils/getBrowser';
import {isInstalled} from '../utils/isInstalled';

/**
 * A utility hook for conditionally displaying download links for browser extensions + mobile apps.
 */
export function useConnectorDownloadLinks() {
  const {pendingConnector} = useWalletConnection();

  if (!pendingConnector) {
    return null;
  }

  const {browserExtensions, mobileApps, name} = pendingConnector;
  const {browser, mobilePlatform} = getBrowserInfo();
  const extensionInstalled = isInstalled(name);

  if (!browserExtensions && !mobileApps) {
    return null;
  }

  const browserExtensionLink = browserExtensions?.[browser];
  const browserExtensionLabel = `Get the ${name} extension`;

  const browserExtensionButton =
    browserExtensionLink && !extensionInstalled ? (
      <Button
        label={browserExtensionLabel}
        link={{href: browserExtensionLink, target: '_blank'}}
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
      link={{href: androidDownloadLink, target: '_blank'}}
    />
  ) : null;

  const iOSDownloadButton = iOSDownloadLink ? (
    <Button
      label={
        mobilePlatform ? mobileAppDownloadLabel : `Get the ${name} app for iOS`
      }
      link={{href: iOSDownloadLink, target: '_blank'}}
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
