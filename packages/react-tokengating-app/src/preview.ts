import './index';

const gmShopContainerId = 'preview-div-id';
let eventBus: any;

const ThemeAppExtension = new window.gmShop.ThemeAppExtension({
  containerId: gmShopContainerId,
  initialState: {
    isLoading: true,
  },
  setupEventBus: (eventBusFromReactApp: any) => {
    // eslint-disable-next-line no-console
    console.log('Theme: event bus listening');
    eventBus = eventBusFromReactApp;

    listenToEvent(
      'RequestWalletVerificationMessage',
      (variables: any, dispatch: any) => {
        const responseData = {
          verification: {
            message: `verification message for ${
              variables.address
            } - ${new Date().toISOString()}`,
            generatedAt: new Date().toISOString(),
          },
        };
        setTimeout(() => dispatch(responseData), 500);
      },
    );

    listenToEvent(
      'CheckIfWalletMeetsRequirements',
      (variables: any, dispatch: any) => {
        const {address, message, signature} = variables;
        const responseData = {
          isUnlocked: true,
          unlockingTokens: [
            {
              token: {
                contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
                contractName: 'CommerceTown',
                mediaUrl:
                  'https://i.seadn.io/gae/k9HIMmZMIpgCM0PpaJJo3Lp1rzLKHgYBqehzihsFJ1EgP_xZVDCrqjVQJJyfkX0_HaFxf0IQgO8Ws-5lkqlIhCnh_cBlzOqa1xeVww?auto=format&w=1000',
                title: 'Townfolk #103',
                tokenId: '103',
                totalOrderLimit: '2',
                consumedOrderLimit: '0'
              },
            },
            {
              token: {
                contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
                contractName: 'Squad',
                mediaUrl:
                  'https://lh3.googleusercontent.com/ccbUlfwRAjrGj3OBdKI9mJL0sQqBc8kXloSrk-9dOuOmIbhGqMwCpAZp_kpqsFK-0s3SqOjb7qi-8Jo7kEhmxZ_gSub9MphvrHKwBA=w650',
                title: 'Squaddy #24',
                tokenId: '24',
                totalOrderLimit: '2',
                consumedOrderLimit: '0'
              },
            },
          ],
        };
        setTimeout(() => dispatch(responseData), 500);
      },
    );
  },
});
ThemeAppExtension.mount();

const gateRequirement = await getGateRequirement();

ThemeAppExtension.update({
  isLoading: false,
  isLocked: true,
  unlockingTokens: [],
  gateRequirement,
});

function listenToEvent(eventName: any, callback: any) {
  if (!eventBus) return;

  eventBus?.on(`${eventName}-reactToTheme`, (variables: any) => {
    callback(variables, (responseData: any) =>
      eventBus?.dispatch(`${eventName}-themeToReact`, responseData),
    );
  });
}

function getGateRequirement() {
  return new Promise((resolve) => {
    // Mock API call latency
    setTimeout(() => {
      resolve({
        tokenSeries: [
          {
            name: 'CommerceTown',
            conditionsDescription: 'Any token',
            contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
            imageUrl:
              'https://i.seadn.io/gae/Ywa40DYuhA_QIsok7A8wOhHS8RXn_j0MVh_pqabfO_USbZzoViHh82ucJk35b2QlEqHRttU32F_0NvRZBxhaVzP4UgyUNEPzuEi2?auto=format&w=384',
          },
          {
            name: 'Squaddy',
            conditionsDescription: 'Any token',
            contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
            imageUrl:
              'https://i.seadn.io/gae/QM_-oRsm9DoB2GQ9iuMbJtdWaVJjrOwIkEVEjdPHdsSWTilWIfNOPgKSD502tv9NMTOCSP9kQve8b8h_jQahzs3a4EVH11Ck0l9iKw?auto=format&w=384',
          },
        ],
        operator: 'OR',
      });
    }, 300);
  });
}
