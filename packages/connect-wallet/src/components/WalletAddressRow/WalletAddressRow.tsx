import {CircleTick, Copy, Text, formatWalletAddress} from 'shared';

import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';

import {AddressRow} from './style';

interface Props {
  address: string;
}

export const WalletAddressRow = ({address}: Props) => {
  const {copy, copied} = useCopyToClipboard();

  return (
    <AddressRow onClick={() => copy(address)}>
      <Text variant="bodyMd" as="span">
        {formatWalletAddress(address)}
      </Text>
      {copied ? CircleTick : Copy}
    </AddressRow>
  );
};
