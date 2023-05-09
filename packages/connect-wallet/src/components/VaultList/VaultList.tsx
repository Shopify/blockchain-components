import {Text, DelegateCash} from 'shared';
import {Address} from 'wagmi';

import {VaultListRow} from './components/VaultListRow';

import {useTranslation} from '~/hooks';

export const VaultList = ({vaults}: {vaults?: Address[]}) => {
  const {t} = useTranslation('VaultList');

  if (!vaults || vaults.length === 0) return null;

  return (
    <div className="sbc-w-full sbc-rounded-lg sbc-bg-address-chip sbc-p-4">
      <div className="sbc-flex sbc-items-start sbc-gap-x-4">
        <div className="sbc-w-4">{DelegateCash}</div>
        <Text color="primary" variant="bodyMd">
          {t('title', {count: vaults.length})}
        </Text>
      </div>
      <div className="sbc-flex sbc-flex-col sbc-pt-3">
        {vaults.map((vault) => (
          <VaultListRow key={vault} vault={vault} />
        ))}
      </div>
    </div>
  );
};
