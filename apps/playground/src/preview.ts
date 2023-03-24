import './index';

let eventBus: any;

const ThemeAppExtension = new window.playground.ThemeAppExtension({
  containerId: 'root',
  initialState: {
    isLoading: true,
  },
  setupEventBus: (eventBusFromReactApp: any) => {
    // eslint-disable-next-line no-console
    console.log('Theme: event bus listening');
    eventBus = eventBusFromReactApp;

    listenToEvent(
      'CheckIfWalletMeetsRequirements',
      (_variables: any, dispatch: any) => {
        const responseData = {
          isUnlocked: true,
          unlockingTokens: [
            {
              token: {
                contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
                contractName: 'CryptoPunks',
                mediaUrl:
                  'https://i.seadn.io/gae/ZWEV7BBCssLj4I2XD9zlPjbPTMcmR6gM9dSl96WqFHS02o4mucLaNt8ZTvSfng3wHfB40W9Md8lrQ-CSrBYIlAFa?auto=format&w=1000',
                title: 'CryptoPunk #1719',
                tokenId: '1719',
                consumedOrderLimit: 0,
              },
            },
            {
              token: {
                contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
                contractName: 'Moonbirds',
                mediaUrl:
                  'https://looksrare.mo.cloudinary.net/0x23581767a106ae21c074b2276D25e5C3e136a68b/0x66936fd157d67f7f12155b72f323b413ab7694f4d38d800b330b7ad16bc41f4d?resource_type=image&f=auto&c=limit&w=1600&q=auto:best',
                title: '#403 🪺',
                tokenId: '403',
                consumedOrderLimit: 0,
              },
            },
          ],
        };
        setTimeout(() => dispatch(responseData), 500);
      },
    );

    listenToEvent('DisconnectWallet', (_variables: any, dispatch: any) => {
      setTimeout(() => dispatch({}), 500);
    });
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
            name: 'CryptoPunks',
            contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
            imageUrl:
              'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=384',
            links: [
              {
                marketplace: 'OpenSea',
                url: 'https://opensea.io',
              },
              {
                marketplace: 'Blur',
                url: 'https://blur.io',
              },
              {
                marketplace: 'Coinbase NFT',
                url: 'https://nft.coinbase.com',
              },
              {
                marketplace: 'Rarible',
                url: 'https://rarible.com',
              },
              {
                marketplace: 'MagicEden',
                url: 'https://magiceden.io',
              },
              {
                marketplace: 'LooksRare',
                url: 'https://looksrare.org',
              },
              {
                marketplace: 'SuperRare',
                url: 'https://superrare.com',
              },
              {
                label: 'Custom URL',
                url: 'https://customurl.com',
              },
              {
                label: 'Custom image URL',
                imageUrl: 'https://cdn.shopify.com/static/shopify-favicon.png',
                url: 'https://shopify.com',
              },
            ],
          },
          {
            name: 'Moonbirds',
            contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
            imageUrl:
              'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=384',
          },
        ],
      });
    }, 300);
  });
}
