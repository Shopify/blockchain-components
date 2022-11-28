import './index';

const gmShopContainerId = 'preview-div-id';
let eventBus: any;

const ThemeAppExtension = new window.gmShop.ThemeAppExtension({
  containerId: gmShopContainerId,
  initialState: {
    isLocked: true,
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
