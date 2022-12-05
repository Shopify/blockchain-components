interface ItemProps {
  href: string;
  name: string;
}

// WalletConnect relies on this as the key for deeplinking.
const STORAGE_KEY = 'WALLETCONNECT_DEEPLINK_CHOICE';

export function useWalletConnectDeeplink() {
  const setKey = ({href, name}: ItemProps) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        href: href.split('?')[0],
        name,
      }),
    );
  };

  const deleteKey = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    deleteKey,
    setKey,
  };
}
