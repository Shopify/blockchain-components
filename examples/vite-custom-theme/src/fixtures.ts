import type {Requirements, UnlockingToken} from '@shopify/tokengate';

export const requirements: Requirements = {
  conditions: [
    {
      contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      imageUrl:
        'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=384',
      name: 'CryptoPunks',
    },
    {
      contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
      imageUrl:
        'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=384',
      name: 'Moonbirds',
    },
  ],
  logic: 'ANY',
};

export const unlockingTokens: UnlockingToken[] = [
  {
    collectionName: 'CryptoPunks',
    consumedRedemptionLimit: 0,
    contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    imageUrl:
      'https://i.seadn.io/gae/ZWEV7BBCssLj4I2XD9zlPjbPTMcmR6gM9dSl96WqFHS02o4mucLaNt8ZTvSfng3wHfB40W9Md8lrQ-CSrBYIlAFa?auto=format&w=1000',
    name: 'CryptoPunk #1719',
  },
  {
    collectionName: 'Moonbirds',
    consumedRedemptionLimit: 0,
    contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
    imageUrl:
      'https://looksrare.mo.cloudinary.net/0x23581767a106ae21c074b2276D25e5C3e136a68b/0x66936fd157d67f7f12155b72f323b413ab7694f4d38d800b330b7ad16bc41f4d?resource_type=image&f=auto&c=limit&w=1600&q=auto:best',
    name: '#403 🪺',
  },
];

export async function checkIfWalletMeetsRequirements(): Promise<
  UnlockingToken[]
> {
  return new Promise((resolve) => {
    // I chose an arbitrary number to "simulate" a network response.
    setTimeout(() => resolve(unlockingTokens), 1500);
  });
}
