import {CircleTick, Copy, formatWalletAddress, Text} from 'shared';
import type {Address} from 'wagmi';

import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';

interface AddressChipProps {
  address: Address;
}

export const AddressChip = ({address}: AddressChipProps) => {
  const {copy, copied} = useCopyToClipboard();

  return (
    <button
      className="sbc-flex sbc-cursor-pointer sbc-items-center sbc-gap-x-3 sbc-rounded-full sbc-bg-address-chip sbc-py-2 sbc-px-3 sbc-text-address-chip sbc-transition-colors sbc-border-none hover:sbc-bg-address-chip-hover"
      onClick={() => copy(address)}
      type="button"
    >
      <Text as="span" className="sbc-pointer-events-none" variant="bodyLg">
        {formatWalletAddress(address)}
      </Text>
      {copied ? CircleTick : Copy}
    </button>
  );
};
