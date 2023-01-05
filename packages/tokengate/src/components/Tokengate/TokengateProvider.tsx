import {RootProvider} from 'shared';

import {Tokengate} from './Tokengate';
import {TokengateProps} from './types';

export const TokengateProvider = ({
  connectButton,
  isLoading,
  isLocked,
  isSoldOut,
  onConnectWallet,
  onConnectedWalletActions,
  wallet,
  availableDate,
  gateRequirement,
  unlockingTokens,
}: TokengateProps) => {
  return (
    <RootProvider>
      <Tokengate
        connectButton={connectButton}
        isLoading={isLoading}
        isLocked={isLocked}
        isSoldOut={isSoldOut}
        onConnectWallet={onConnectWallet}
        onConnectedWalletActions={onConnectedWalletActions}
        wallet={wallet}
        availableDate={availableDate}
        gateRequirement={gateRequirement}
        unlockingTokens={unlockingTokens}
      />
    </RootProvider>
  );
};
