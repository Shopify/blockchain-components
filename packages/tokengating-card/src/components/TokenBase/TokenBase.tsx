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

const TokenBase = ({icon}: TokenBaseProps) => (
  <TokenBaseStyle>
    <TokenBaseIcon>{icon}</TokenBaseIcon>
    <TokenBaseText>
      <TokenBaseTitle>CommerceTown</TokenBaseTitle>
      <TokenBaseSubtitle>Any token</TokenBaseSubtitle>
    </TokenBaseText>
  </TokenBaseStyle>
);

export {TokenBase};
