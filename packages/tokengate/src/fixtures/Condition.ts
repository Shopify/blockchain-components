import {deepMerge, DeepPartial} from 'shared';

import {Condition} from '../types';

export const ConditionFixture = (customProps?: DeepPartial<Condition>) =>
  deepMerge(
    {
      name: 'CryptoPunks',
      collectionAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      imageUrl:
        'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=384',
    },
    customProps ?? {},
  ) as Condition;

export const ConditionArrayFixture = () => [
  ConditionFixture(),
  ConditionFixture({
    name: 'Moonbirds',
    imageUrl:
      'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=384',
    collectionAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
  }),
];
