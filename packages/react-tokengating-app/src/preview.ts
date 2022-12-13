import './index';

const gmShopContainerId = 'preview-div-id';
let eventBus: any;

const ThemeAppExtension = new window.gmShop.ThemeAppExtension({
  containerId: gmShopContainerId,
  initialState: {
    isLoading: true,
  },
  setupEventBus: (eventBusFromReactApp: any) => {
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
                orderLimit: '2'
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
                orderLimit: '2'
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
              'https://s3-alpha-sig.figma.com/img/4af6/bc17/b1ccba7536568db8f1c172664c336c15?Expires=1670803200&Signature=DHM2F96vlOu~FdWHOGKIyxz1h~ABKxiYkp4O8KmuGnS80a6nuXdHXbZvt809aFtcJo8c1HUYS6nsI9AQuaRC5M7b5oMJTIPdnAvASulKXvbuRjAjPvuDfGPJziJCfj0cMb-I2DA4KGlGFlsuJs4jfBTRH0JINihzjlcFoy-XiRjGMYTnMQa0k4r63ZSzwJWQSG-t0-TZFDtCiQ-KC148YNXxOLsU6rS9Tm-b-3qzbobzJiJTvhum54dDSkNCYPMmWsrS~WwH4FVx1xaOOFDek0HzsGpUXHvQmZeQ7uBos5McdwToKgeYYb9qNF20uj8AJ0I8oSaPG351v4olYdV8Zw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          },
          {
            name: 'Squaddy',
            conditionsDescription: 'Any token',
            contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
            imageUrl:
              'https://s3-alpha-sig.figma.com/img/8a01/14ee/54c147e4cc682d409dbedd86608a436e?Expires=1670803200&Signature=eqTrg3iObfLR6B6loY2Dqu1AcJeJjX0eiGpvYB-A5khGzoWyHQC-enPYnEOkBUp-2L--mrphhHPHVo8mejgX4mOWSDmuMECIUOWGH2w7d~eZVGdglkN~-PsqhCCaxkrt7hxfS3Zo~BnsrezX~ND7gtY0DHoCGPo2S58xX9FxxfwPSerhttmByxx69tUsN9cqbeveIpVhGBC-EnbnWZnBYgFhkSEspPRmhmN-gF-J-YjInKFz4uG2GyZoThroyiMp-CDMVJatufCijQF9B5uvEjnLghdAmZfUxYiFpo0P6kWPUO7bS8xPBGEEnpiHyx73CpVgc3WKN~m5SZ59dgPDcA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          },
        ],
        operator: 'OR',
      });
    }, 300);
  });
}
