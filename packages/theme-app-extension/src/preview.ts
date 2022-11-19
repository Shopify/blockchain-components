import './index';

const gmShopContainerId = 'preview-div-id';

const ThemeAppExtension = new window.gmShop.ThemeAppExtension({
  containerId: gmShopContainerId,
  initialState: {},
  callbacks: {
    onStateChange: (state: any) => {
      // call from context hooks
      // save state in local storage/cookie
      // gets passed back in in initialState
      // eslint-disable-next-line no-console
      console.log('tokengate card onStateChange', state);
    },
  },
});
ThemeAppExtension.mount();
