import {Text, DelegateCash} from 'shared';
import {Address} from 'wagmi';

import {useTranslation} from '../../hooks/useTranslation';

import {VaultListRow} from './components/VaultListRow';

export const VaultList = ({vaults}: {vaults?: Address[]}) => {
  const {t} = useTranslation('VaultList');

  if (!vaults) return null;

  return (
    <div className="sbc-w-full sbc-rounded sbc-bg-address-chip sbc-p-4">
      <div className="sbc-flex sbc-items-start sbc-gap-x-4">
        <div className="sbc-w-4">{DelegateCash}</div>
        <Text variant="bodyMd">{t('title', {count: vaults.length})}</Text>
      </div>
      <div className="sbc-flex sbc-flex-col sbc-pt-3">
        {vaults.map((vault, index) => (
          <div key={vault} className="sbc-w-full">
            <VaultListRow vault={vault} />
            {index < vaults.length - 1 ? (
              <span className="sbc-h-px sbc-flex-1 sbc-bg-divider" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
