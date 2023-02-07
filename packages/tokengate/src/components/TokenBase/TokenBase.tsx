import {Text} from 'shared';

import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseText,
  TokenBaseBadge,
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
    <TokenBaseIcon round={round}>
      {icon}
      <TokenBaseBadge>{badge}</TokenBaseBadge>
    </TokenBaseIcon>

    <TokenBaseText>
      <Text as="p" variant="bodyLg">
        {title}
      </Text>

      <Text as="p" variant="bodyMd" color="secondary">
        {subtitle}
      </Text>
    </TokenBaseText>

    {rightContent}
  </TokenBaseStyle>
);

export {TokenBase};
