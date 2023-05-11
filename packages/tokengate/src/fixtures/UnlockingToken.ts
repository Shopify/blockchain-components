import {deepMerge, DeepPartial} from 'shared';

import {UnlockingToken} from '~/types';

export enum UnlockingTokenFixtureType {
  CryptoPunks,
  Moonbirds,
}

const CryptoPunksProps = {
  contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
  collectionName: 'CryptoPunks',
  imageUrl:
    'https://i.seadn.io/gae/ZWEV7BBCssLj4I2XD9zlPjbPTMcmR6gM9dSl96WqFHS02o4mucLaNt8ZTvSfng3wHfB40W9Md8lrQ-CSrBYIlAFa?auto=format&w=1000',
  name: 'CryptoPunk #1719',
};

const MoonbirdsProps = {
  contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
  collectionName: 'Moonbirds',
  imageUrl:
    'https://looksrare.mo.cloudinary.net/0x23581767a106ae21c074b2276D25e5C3e136a68b/0x66936fd157d67f7f12155b72f323b413ab7694f4d38d800b330b7ad16bc41f4d?resource_type=image&f=auto&c=limit&w=1600&q=auto:best',
  name: '#403 🪺',
};

type UnlockingTokenFixtureProps = DeepPartial<UnlockingToken> & {
  type?: UnlockingTokenFixtureType;
};

export const UnlockingTokenFixture = ({
  type = UnlockingTokenFixtureType.CryptoPunks,
  ...rest
}: UnlockingTokenFixtureProps) => {
  const baseProps =
    type === UnlockingTokenFixtureType.CryptoPunks
      ? CryptoPunksProps
      : MoonbirdsProps;

  return deepMerge(baseProps, rest) as UnlockingToken;
};

export const UnlockingTokenWithOrderLimitFixture = ({
  type = UnlockingTokenFixtureType.CryptoPunks,
  ...rest
}: UnlockingTokenFixtureProps) => {
  const mergedProps = deepMerge(
    {
      consumedRedemptionLimit: 0,
    },
    rest,
  );

  return UnlockingTokenFixture({
    ...mergedProps,
    type,
  });
};

export const UnlockingTokenWithOrderLimitMetFixture = ({
  type = UnlockingTokenFixtureType.CryptoPunks,
  ...rest
}: UnlockingTokenFixtureProps) => {
  const mergedProps = deepMerge(
    {
      consumedRedemptionLimit: 2,
    },
    rest,
  );
  return UnlockingTokenFixture({
    ...mergedProps,
    type,
  });
};
