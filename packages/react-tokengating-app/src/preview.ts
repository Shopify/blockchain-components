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
                  'https://i.seadn.io/gae/5GWHLyazRjjgN4hReAbM8kNEccOSJ0TTlKjIgfu1PAEzNnarcBvfPEaNQKnhom5PYhHVHqBjow3GhsDB7SVaBEGxqiJv_qyDqfRORQ?w=500&auto=format',
                title: 'Townfolk #103',
                tokenId: '103',
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

function listenToEvent(eventName: any, callback: any) {
  if (!eventBus) return;

  eventBus?.on(`${eventName}-reactToTheme`, (variables: any) => {
    callback(variables, (responseData: any) =>
      eventBus?.dispatch(`${eventName}-themeToReact`, responseData),
    );
  });
}
