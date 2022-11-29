import './index';

const gmShopContainerId = 'preview-div-id';
let eventBus: any;

const ThemeAppExtension = new window.gmShop.ThemeAppExtension({
  containerId: gmShopContainerId,
  initialState: {
    isLocked: true,
    gateRequirement: {abc: 123},
  },
  setupEventBus: (eventBusFromReactApp: any) => {
    console.log('Theme: event bus listening');
    eventBus = eventBusFromReactApp;

    listenToEvent(
      'RequestWalletVerificationMessage',
      (variables: any, dispatch: any) => {
        const responseData = {
          verification: {
            message: `verification message for ${variables.address}`,
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
        // eslint-disable-next-line no-console
        console.log({address, message, signature});
        const responseData = {
          isUnlocked: true,
          unlockingTokens: ['token1', 'token2'],
        };
        setTimeout(() => dispatch(responseData), 500);
      },
    );
  },
});
ThemeAppExtension.mount();

function listenToEvent(eventName: any, callback: any) {
  if (!eventBus) return;

  eventBus?.on(`${eventName}-reactToTheme`, (variables: any) => {
    callback(variables, (responseData: any) =>
      eventBus?.dispatch(`${eventName}-themeToReact`, responseData),
    );
  });
}
