import {ReactNode, useCallback, useEffect, useState} from 'react';
import {
  IconButton,
  More,
  Popover,
  Text,
  useKeyPress,
  useMediaQuery,
  useOutsideClick,
} from 'shared';

import {Link} from '../Link';

import {useTranslation} from '../../hooks/useTranslation';
import {LinkType} from '../../types';

interface TokenBaseProps {
  badge?: React.ReactNode;
  icon: React.ReactNode;
  links?: LinkType[];
  rightContent?: React.ReactNode;
  round: boolean;
  subtitle?: ReactNode;
  title?: ReactNode;
}

export const TokenBase = ({
  badge,
  icon,
  links,
  rightContent,
  round,
  subtitle,
  title,
}: TokenBaseProps) => {
  const wrapperId = `token-base-${title}`;
  const [popoverVisible, setPopoverVisible] = useState(false);
  const isMobile = useMediaQuery('smDown');

  const ref = useOutsideClick(() => !isMobile && setPopoverVisible(false));
  const escPress = useKeyPress('Escape');

  const {t} = useTranslation('Link');

  const togglePopover = useCallback(() => {
    setPopoverVisible(!popoverVisible);
  }, [popoverVisible]);

  useEffect(() => {
    if (escPress && popoverVisible) {
      togglePopover();
    }
  }, [escPress, popoverVisible, togglePopover]);
  return (
    <div className="sbc-relative" id={wrapperId} ref={ref}>
      <div className="sbc-flex sbc-w-full sbc-flex-row sbc-items-center sbc-gap-x-3">
        <div className="sbc-relative sbc-h-12 sbc-w-12">
          <div
            className={`sbc-h-full sbc-w-full sbc-overflow-hidden ${
              round ? 'sbc-rounded-full' : 'sbc-rounded'
            }`}
          >
            {icon}
          </div>

          {badge ? (
            <div className="sbc-absolute sbc-right-[-2px] sbc-bottom-[-2px] sbc-rounded-full sbc-bg-tokengate sbc-leading-none">
              {badge}
            </div>
          ) : null}
        </div>

        <div className="sbc-flex-grow">
          <Text
            as="p"
            className="sbc-capitalize"
            color="primary"
            variant="bodyLg"
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              as="p"
              className="sbc-capitalize"
              color="secondary"
              variant="bodyMd"
            >
              {subtitle}
            </Text>
          ) : null}
        </div>

        {links?.length ? (
          <IconButton
            aria-label={t('more') as string}
            icon={More}
            onClick={togglePopover}
          />
        ) : (
          rightContent
        )}
      </div>
      <Popover
        containerClass="sm:sbc-min-w-[150px]"
        frameClass="sbc-gap-y-5"
        id={`shopify-tokengate-${title}-marketplace-links`}
        onDismiss={() => setPopoverVisible(false)}
        target={wrapperId}
        visible={popoverVisible}
      >
        {links?.map((props) => (
          <Link key={props.url} {...props} />
        ))}
      </Popover>
    </div>
  );
};
