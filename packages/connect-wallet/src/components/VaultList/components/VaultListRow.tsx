import {CircleTick, Copy, Text, formatWalletAddress} from 'shared';

import {useCopyToClipboard} from '../../../hooks/useCopyToClipboard';

interface Props {
  vault: string;
}

export const VaultListRow = ({vault}: Props) => {
  const {copy, copied} = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(vault)}
      type="button"
      className="sbc-flex sbc-w-full sbc-cursor-pointer sbc-items-center sbc-justify-between sbc-gap-x-3 sbc-bg-address-chip sbc-py-2 sbc-px-0 sbc-text-address-chip sbc-transition-colors sbc-border-none hover:sbc-bg-address-chip-hover"
    >
      <Text variant="bodySm" as="span">
        {formatWalletAddress(vault)}
      </Text>
      {copied ? CircleTick : Copy}
    </button>
  );
};
