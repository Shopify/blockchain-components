import {Card} from '../Card';
import {TokenBase} from '../TokenBase';
import {
  TokengateRequirementsBadge,
  TokengateRequirementsSeparator,
} from '../TokengateRequirements';
import {TokenListImage} from '../TokenList';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {TokenListWrapper} from '../TokenList/style';

export const Gate = ({children, title, subtitle}: any) => {
  return (
    <Card title={title} subtitle={subtitle}>
      {children}
    </Card>
  );
};

const Conditions = TokenListWrapper;
const Condition = ({title, subtitle, imageUrl, badge}: any) => (
  <TokenBase
    title={title}
    subtitle={subtitle}
    round
    icon={<TokenListImage imageUrl={imageUrl} alt={title} />}
    badge={badge}
  />
);

Gate.Conditions = Conditions;
Gate.Condition = Condition;
Gate.Condition = Condition;
Gate.Separator = TokengateRequirementsSeparator;
Gate.Badges = {
  InvalidCondition: TokengateRequirementsBadge,
};
