import {deepMerge} from 'shared/src/utils/deepMerge';
import {DeepPartial} from 'shared/src/types/deepPartial';
import {UnlockingToken} from 'types';

export enum UnlockingTokenFixtureType {
  CommerceTown,
  Squaddy,
}

const CommerceTownProps = {
  token: {
    contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    contractName: 'CommerceTown',
    mediaUrl:
      'https://i.seadn.io/gae/k9HIMmZMIpgCM0PpaJJo3Lp1rzLKHgYBqehzihsFJ1EgP_xZVDCrqjVQJJyfkX0_HaFxf0IQgO8Ws-5lkqlIhCnh_cBlzOqa1xeVww?auto=format&w=1000',
    title: 'Townfolk #103',
    tokenId: '103',
  },
};

const SquaddyProps = {
  token: {
    contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
    contractName: 'Squad',
    mediaUrl:
      'https://lh3.googleusercontent.com/ccbUlfwRAjrGj3OBdKI9mJL0sQqBc8kXloSrk-9dOuOmIbhGqMwCpAZp_kpqsFK-0s3SqOjb7qi-8Jo7kEhmxZ_gSub9MphvrHKwBA=w650',
    title: 'Squaddy #24',
    tokenId: '24',
  },
};

export const UnlockingTokenFixture = (
  customProps?: DeepPartial<UnlockingToken>,
  type: UnlockingTokenFixtureType = UnlockingTokenFixtureType.CommerceTown,
) => {
  const baseProps =
    type === UnlockingTokenFixtureType.CommerceTown
      ? CommerceTownProps
      : SquaddyProps;
  return deepMerge(baseProps, customProps ?? {}) as UnlockingToken;
};

export const UnlockingTokenWithOrderLimitFixture = (
  customProps?: DeepPartial<UnlockingToken>,
  type?: UnlockingTokenFixtureType,
) =>
  UnlockingTokenFixture(
    deepMerge(
      {
        token: {
          consumedOrderLimit: 0,
          totalOrderLimit: 2,
        },
      },
      customProps ?? {},
    ),
    type,
  );

export const UnlockingTokenWithOrderLimitMetFixture = (
  customProps?: DeepPartial<UnlockingToken>,
  type?: UnlockingTokenFixtureType,
) =>
  UnlockingTokenFixture(
    deepMerge(
      {
        token: {
          consumedOrderLimit: 2,
          totalOrderLimit: 2,
        },
      },
      customProps ?? {},
    ),
    type,
  );
