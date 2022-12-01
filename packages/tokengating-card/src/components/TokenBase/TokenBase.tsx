import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseTitle,
  TokenBaseSubtitle,
  TokenBaseText,
} from './style';

interface TokenBaseProps {
  title?: string;
  subtitle?: string;
  icon: React.ReactNode;
  round: boolean;
}

const TokenBase = ({title, subtitle, icon, round}: TokenBaseProps) => (
  <TokenBaseStyle>
    <TokenBaseIcon round={round}>{icon}</TokenBaseIcon>
    <TokenBaseText>
      <TokenBaseTitle>{title}</TokenBaseTitle>
      <TokenBaseSubtitle>{subtitle}</TokenBaseSubtitle>
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBase};
