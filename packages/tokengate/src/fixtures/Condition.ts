import {deepMerge} from 'shared/src/utils/deepMerge';
import {DeepPartial} from 'shared/src/types/deepPartial';
import {Condition} from 'types';

export const ConditionFixture = (customProps?: DeepPartial<Condition>) =>
  deepMerge(
    {
      name: 'Squaddy',
      conditionsDescription: 'Any token',
      collectionAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
      imageUrl:
        'https://i.seadn.io/gae/QM_-oRsm9DoB2GQ9iuMbJtdWaVJjrOwIkEVEjdPHdsSWTilWIfNOPgKSD502tv9NMTOCSP9kQve8b8h_jQahzs3a4EVH11Ck0l9iKw?auto=format&w=384',
    },
    customProps ?? {},
  ) as Condition;

export const ConditionArrayFixture = () => [
  ConditionFixture(),
  ConditionFixture({
    name: 'CommerceTown',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0655/4003/0698/products/artworkfc5ead09-c25c-447b-b5fa-6be315af2135-LARGE.png?v=1663943192&width=1426',
    collectionAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
  }),
];
