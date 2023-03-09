import {ReactNode, useCallback, useEffect, useState} from 'react';
import {
  Popover,
  Text,
  useKeyPress,
  useMediaQuery,
  useOutsideClick,
} from 'shared';
import {Link} from 'src/types';

import {
  TokenBaseStyle,
  TokenBaseIcon,
  TokenBaseText,
  TokenBaseBadge,
  Wrapper,
} from './style';

interface TokenBaseProps {
  title?: string;
  subtitle?: ReactNode;
  icon: React.ReactNode;
  round: boolean;
  badge?: React.ReactNode;
  rightContent?: React.ReactNode;
  isUnlocked?: boolean;
  links?: Link[];
}

const TokenBase = ({
  title,
  subtitle,
  icon,
  round,
  badge,
  rightContent,
  isUnlocked,
  links,
}: TokenBaseProps) => {
  const wrapperId = `token-base-${title}`;
  const [popoverVisible, setPopoverVisible] = useState(false);
  const isMobile = useMediaQuery('smDown');

  const ref = useOutsideClick(() => !isMobile && setPopoverVisible(false));
  const escPress = useKeyPress('Escape');

  const togglePopover = useCallback(() => {
    setPopoverVisible(!popoverVisible);
  }, [popoverVisible]);

  useEffect(() => {
    if (escPress && popoverVisible) {
      togglePopover();
    }
  }, [escPress, popoverVisible, togglePopover]);
  return (
    <Wrapper id={wrapperId} ref={ref}>
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
        {links?.length && !isUnlocked ? (
          // eslint-disable-next-line react/button-has-type, @shopify/jsx-no-hardcoded-content
          <button onClick={togglePopover}>Show links</button>
        ) : (
          rightContent
        )}
      </TokenBaseStyle>

      <Popover
        id={wrapperId}
        visible={popoverVisible}
        onDismiss={() => setPopoverVisible(false)}
      >
        {links?.map(({marketplace}) => {
          return (
            <div key={marketplace}>
              <span>{marketplace}</span>
            </div>
          );
        })}
      </Popover>
    </Wrapper>
  );
};

export {TokenBase};
