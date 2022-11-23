import {Apps, Gift, Key} from 'shared/assets/icons';

interface InformationRow {
  content: string;
  icon: JSX.Element;
  title: string;
}

/**
 * We should consider replacing this content with i18n?
 */
export const WhatAreWalletsInformation: InformationRow[] = [
  {
    content:
      'A wallet lets you send, receive, and manage your cryptocurrencies and NFTs.',
    icon: Apps,
    title: 'A home for digital assets',
  },
  {
    content:
      'Connecting your wallet somewhere lets you “login” and put your assets to use.',
    icon: Key,
    title: 'A new way to login',
  },
  {
    content:
      'Assets in your wallet can unlock perks like exclusive products or discounts.',
    icon: Gift,
    title: 'Your key to collaborative commerce',
  },
];
