import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseTitle,
  TokenBaseSubtitle,
  TokenBaseText,
  TokenBaseBadge,
  TokenBaseIconWrapper,
} from './style';

interface TokenBaseProps {
  title?: string;
  subtitle?: string;
  icon: React.ReactNode;
  round: boolean;
  badge?: React.ReactNode;
}

const TokenBase = ({title, subtitle, icon, round, badge}: TokenBaseProps) => (
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
  </TokenBaseStyle>
);

export {TokenBase};
