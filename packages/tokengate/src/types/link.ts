export enum Marketplace {
  Blur = 'Blur',
  CoinbaseNft = 'Coinbase NFT',
  LooksRare = 'LooksRare',
  MagicEden = 'MagicEden',
  OpenSea = 'OpenSea',
  Rarible = 'Rarible',
  SuperRare = 'SuperRare',
}

interface CustomLink {
  label: string;
  marketplace?: never;
  icon?: JSX.Element;
  imageUrl?: string;
  url: string;
}

interface MarketplaceLink {
  label?: never;
  marketplace: `${Marketplace}`;
  icon?: never;
  imageUrl?: never;
  url: string;
}

export type LinkType = CustomLink | MarketplaceLink;
