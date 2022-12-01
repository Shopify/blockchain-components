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
  badge?: React.ReactNode;
}

const TokenBase = ({title, subtitle, icon, badge}: TokenBaseProps) => (
  <TokenBaseStyle>
    <TokenBaseIcon>
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
