import {TokenListProps} from '../TokenList';
import {GateRequirement, TokenSeries, UnlockingToken} from '../TokengatingCard';

import {TokengateRequirementBadge} from './TokengateRequirementBadge';

export const mapGateRequirementToTokenListProps = ({
  gateRequirement,
  unlockingTokens,
  hasMissingTokens,
}: {
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  hasMissingTokens?: boolean;
}): TokenListProps['tokens'] =>
  gateRequirement?.tokenSeries.map((tokenSeries) => {
    let badge;

    // Add the error badges to the token series that do not have an unlocking token
    if (hasMissingTokens) {
      const unlockingTokenForCurrentTokenSeries =
        findUnlockingTokenForTokenSeries({tokenSeries, unlockingTokens});
      badge = unlockingTokens?.length !== undefined &&
        !unlockingTokenForCurrentTokenSeries && <TokengateRequirementBadge />;
    }

    return {
      title: tokenSeries.name,
      subtitle: tokenSeries.conditionsDescription,
      imageUrl: tokenSeries.imageUrl,
      badge,
      round: true,
    };
  });

export const findUnlockingTokenForTokenSeries = ({
  tokenSeries,
  unlockingTokens,
}: {
  tokenSeries: TokenSeries;
  unlockingTokens?: UnlockingToken[];
}) =>
  unlockingTokens?.find(
    (unlockingToken) =>
      unlockingToken.token.contractAddress === tokenSeries.contractAddress,
  );
