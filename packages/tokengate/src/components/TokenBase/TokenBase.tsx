import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseTitle,
  TokenBaseSubtitle,
  TokenBaseText,
  TokenBaseBadge,
  TokenBaseIconWrapper,
  TokenBaseRightContent,
} from './style';

interface TokenBaseProps {
  title?: string;
  subtitle?: string;
  icon: React.ReactNode;
  round: boolean;
  badge?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const TokenBase = ({
  title,
  subtitle,
  icon,
  round,
  badge,
  rightContent,
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
    <TokenBaseRightContent>{rightContent}</TokenBaseRightContent>
  </TokenBaseStyle>
);

export {TokenBase};
