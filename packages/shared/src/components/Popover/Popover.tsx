import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {ReactNode} from 'react';
import {createPortal} from 'react-dom';

import {useIsMounted} from '../../hooks/useIsMounted';
import {useMediaQuery} from '../../hooks/useMediaQuery';
import {ClassName} from '../../types/generic';

import {PopoverVariants} from './variants';

interface PopoverProps {
  children: ReactNode;
  // containerClass allows us to pass any Tailwind class to the container element
  containerClass?: ClassName;
  // frameClass allows us to pass any Tailwind class to the frame element
  frameClass?: ClassName;
  // The ID for the portal DOM element
  id: string;
  // The target ID for the portal (e.g. where the portal will inject into the DOM)
  target: string;
  onDismiss: () => void;
  visible: boolean;
}

export const Popover = ({
  children,
  containerClass,
  frameClass,
  id,
  onDismiss,
  target,
  visible,
}: PopoverProps) => {
  const isMounted = useIsMounted();
  const isMobile = useMediaQuery('smDown');
  const reducedMotion = useReducedMotion();

  if (!isMounted) {
    return null;
  }

  const portalElement = isMobile
    ? document.body
    : document.getElementById(target);

  if (!portalElement) {
    return null;
  }

  /**
   * Using a portal here ensures that the component will mount at a point
   * in the DOM that is relevant to the size of the device. For example,
   * on mobile devices, this will render within the document.body, but in
   * the context of a desktop device, this will render in the
   * provided target ID.
   */
  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <m.div
            className={`sbc-fixed sbc-bottom-0 sbc-right-0 sbc-top-0 sbc-z-max sbc-flex sbc-min-w-full sbc-flex-col sbc-justify-end sbc-p-0 sm:sbc-absolute sm:sbc-bottom-auto sm:sbc-top-full sm:sbc-py-1 ${containerClass}`}
            exit={{pointerEvents: 'none'}}
            id={id}
            initial={{pointerEvents: 'auto'}}
          >
            <m.div
              animate={{opacity: 1}}
              className="sbc-absolute sbc-z-10 sbc-block sbc-h-full sbc-w-full sbc-bg-overlay sm:!sbc-hidden"
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              onClick={onDismiss}
            />
            <m.div
              animate="show"
              className={`sbc-popover-frame-content sbc-z-20 sbc-flex sbc-flex-col sbc-items-center sbc-rounded-popover-mobile sbc-bg-popover sbc-p-popover sbc-shadow-popover-mobile sbc-border-popover sm:sbc-rounded-popover-desktop sm:sbc-pb-popover sm:sbc-shadow-popover-desktop ${frameClass}`}
              exit="exit"
              initial="exit"
              variants={PopoverVariants({isMobile, reducedMotion})}
            >
              {children}
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    portalElement,
  );
};
