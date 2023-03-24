import {ReactNode} from 'react';
import {
  CoinbaseNft,
  LooksRare,
  MagicEden,
  OpenSea,
  Rarible,
  SuperRare,
  Blur,
  Other,
  Text,
} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';
import {LinkType, Marketplace} from '../../types';

const iconMap: Record<Marketplace, ReactNode> = {
  OpenSea,
  Blur,
  'Coinbase NFT': CoinbaseNft,
  Rarible,
  MagicEden,
  LooksRare,
  SuperRare,
};

export const Link = ({label, marketplace, imageUrl, icon, url}: LinkType) => {
  const {t} = useTranslation('Link');

  /**
   * The logic for an icon to render is as follows:
   * Render the provided `icon` first
   * Render the provided `imageUrl` next
   * Render the `marketplaceIcon` next
   * If none of the above are defined, render the `Other` icon
   */

  // A image url can be passed to render an image
  const customImage = imageUrl ? (
    <img
      alt=""
      className="sbc-h-5 sbc-w-5 sbc-rounded sbc-text-center"
      src={imageUrl}
    />
  ) : null;

  // marketplacesIcon grabs one of the existing marketplace icons from the iconMap
  const marketplaceIcon = marketplace ? iconMap[marketplace] : null;

  // Depending on the input, the iconElement will be set to one of the below
  const iconElement = icon || customImage || marketplaceIcon || Other;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="sbc-flex sbc-w-full sbc-flex-row sbc-gap-x-4 sbc-no-underline"
    >
      <div className="sbc-h-5 sbc-w-5 sbc-text-center">{iconElement}</div>
      <Text color="primary">
        {marketplace ? t('view', {marketplace}) : label}
      </Text>
    </a>
  );
};
