import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseTitle,
  TokenBaseSubtitle,
  TokenBaseText,
  TokenBaseBadge,
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
    <TokenBaseIcon round={round}>
      {icon}
      <TokenBaseBadge>{badge}</TokenBaseBadge>
    </TokenBaseIcon>
    <TokenBaseText>
      <TokenBaseTitle>{title}</TokenBaseTitle>
      <TokenBaseSubtitle>{subtitle}</TokenBaseSubtitle>
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBase};
