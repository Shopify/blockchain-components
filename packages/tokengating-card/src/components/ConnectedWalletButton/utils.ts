export const formatWalletAddress = ({address}: {address?: string}) =>
  address &&
  `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
