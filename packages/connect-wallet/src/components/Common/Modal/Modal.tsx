import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {createPortal} from 'react-dom';
import useMeasure from 'react-use-measure';
import {Cancel, IconButton, Text, useIsMounted, useMediaQuery} from 'shared';

import {useTranslation} from '../../../hooks/useTranslation';

import type {ModalProps} from './types';
import {ModalVariants} from './variants';

export const Modal = ({
  children,
  closeEventName,
  leftButton,
  onDismiss,
  title,
  visible,
}: ModalProps) => {
  const isMounted = useIsMounted();
  const [ref, {height}] = useMeasure();
  const isSmall = useMediaQuery('smDown');
  const reducedMotion = useReducedMotion();
  const {t} = useTranslation('Modal');

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <m.div
            className="sbc-fixed sbc-top-0 sbc-left-0 sbc-right-0 sbc-bottom-0 sbc-z-max sbc-flex sbc-items-end sbc-justify-center sm:sbc-items-center"
            exit={{pointerEvents: 'none'}}
            id="shopify-connect-wallet-modal-container"
            initial={{pointerEvents: 'auto'}}
          >
            <m.div
              animate={{opacity: 1}}
              className="sbc-pointer-events-auto sbc-absolute sbc-z-10 sbc-h-full sbc-w-full sbc-bg-overlay"
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              onClick={onDismiss}
            />
            <m.div
              animate="show"
              className="sbc-relative sbc-z-20 sbc-w-full sbc-max-w-none sbc-overflow-hidden sbc-rounded-popover-mobile sbc-bg-popover sbc-shadow-popover-mobile sbc-border-popover sm:sbc-max-w-sm sm:sbc-rounded-popover-desktop sm:sbc-shadow-popover-desktop"
              exit="exit"
              initial="exit"
              variants={ModalVariants({
                height,
                isSmall,
                reducedMotion,
              })}
            >
              <div ref={ref}>
                <div className="sbc-flex sbc-flex-row sbc-items-center sbc-gap-x-4 sbc-p-popover">
                  {leftButton}

                  <Text
                    as="h2"
                    className="sbc-max-w-full sbc-flex-1 sbc-text-ellipsis sbc-whitespace-nowrap sbc-break-all sbc-text-center sbc-line-clamp-2"
                    variant="headingMd"
                  >
                    {title}
                  </Text>

                  <IconButton
                    aria-label={t('icons.close') as string}
                    icon={Cancel}
                    onClickEventName={closeEventName}
                    onClick={onDismiss}
                  />
                </div>

                {children}
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  );
};
