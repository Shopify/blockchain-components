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
      className="sbc-flex sbc-w-full sbc-cursor-pointer sbc-items-center sbc-justify-between sbc-gap-x-3 sbc-border-t-0 sbc-border-l-0 sbc-border-r-0 sbc-bg-address-chip sbc-py-2 sbc-px-1 sbc-text-address-chip sbc-transition-colors sbc-border-b-divider last-of-type:sbc-border-none hover:sbc-bg-address-chip-hover"
    >
      <Text variant="bodySm" as="span">
        {formatWalletAddress(vault)}
      </Text>
      {copied ? CircleTick : Copy}
    </button>
  );
};
