import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseTitle,
  TokenBaseSubtitle,
  TokenBaseText,
  TokenBaseBadge,
  TokenBaseIconWrapper,
  TokenBaseOrderLimit,
} from './style';

interface TokenBaseProps {
  title?: string;
  subtitle?: string;
  icon: React.ReactNode;
  round: boolean;
  badge?: React.ReactNode;
  orderLimit?: React.ReactNode;
}

const TokenBase = ({
  title,
  subtitle,
  icon,
  round,
  badge,
  orderLimit,
}: TokenBaseProps) => (
  <TokenBaseStyle>
    <TokenBaseIconWrapper>
      <TokenBaseIcon round={round}>
        {icon}
        <TokenBaseBadge>{badge}</TokenBaseBadge>
      </TokenBaseIcon>
    </TokenBaseIconWrapper>
    <TokenBaseText>
      <TokenBaseTitle>{title}</TokenBaseTitle>
      <TokenBaseSubtitle>{subtitle}</TokenBaseSubtitle>
    </TokenBaseText>
    <TokenBaseOrderLimit>0/{orderLimit}</TokenBaseOrderLimit>
  </TokenBaseStyle>
);

export {TokenBase};
