// Only supporting MetaMask for the time being, but
// we can support others in the future as well (e.g. Coinbase)
export function isInstalled(connectorName: string) {
  // Early return when window or window.ethereum is undefined.
  if (typeof window === 'undefined' || !window.ethereum) {
    return false;
  }

  if (connectorName === 'MetaMask') {
    // Not sure if we should inclue isBraveWallet or isTokenary or not.
    const {isMetaMask} = window.ethereum;

    // ESLint seems to think this is always true, but there are cases where it might be isBrave, etc.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (isMetaMask) {
      return true;
    }
  }

  return false;
}
