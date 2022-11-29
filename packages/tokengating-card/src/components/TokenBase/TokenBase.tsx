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
}

const TokenBase = ({title, subtitle, icon}: TokenBaseProps) => (
  <TokenBaseStyle>
    <TokenBaseIcon>{icon}</TokenBaseIcon>
    <TokenBaseText>
      <TokenBaseTitle>{title}</TokenBaseTitle>
      <TokenBaseSubtitle>{subtitle}</TokenBaseSubtitle>
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBase};
