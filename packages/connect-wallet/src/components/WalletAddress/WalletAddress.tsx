import {CircleTick, Copy, Text, formatWalletAddress} from 'shared';

import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';

import {AddressChip} from './style';

interface Props {
  address: string;
}

export const WalletAddress = ({address}: Props) => {
  const {copy, copied} = useCopyToClipboard();

  return (
    <AddressChip onClick={() => copy(address)}>
      <Text as="span" variant="bodyLg">
        {formatWalletAddress(address)}
      </Text>
      {copied ? CircleTick : Copy}
    </AddressChip>
  );
};
