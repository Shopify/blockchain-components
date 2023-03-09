import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {ReactNode} from 'react';
import {createPortal} from 'react-dom';

import {useMediaQuery} from '../../hooks/useMediaQuery';
import {Background, Container, Frame} from './style';
import {PopoverVariants} from './variants';

interface PopoverProps {
  children: ReactNode;
  id: string;
  // mobile?: boolean;
  onDismiss: () => void;
  visible: boolean;
}

export const Popover = ({
  children,
  id,
  // mobile,
  onDismiss,
  visible,
}: PopoverProps) => {
  const isMobile = useMediaQuery('smDown');
  const reducedMotion = useReducedMotion();

  const portalElement = isMobile ? document.body : document.getElementById(id);

  if (!portalElement) {
    return null;
  }

  /**
   * Using a portal here ensures that the component will mount at a point
   * in the DOM that is relevant to the size of the device. For example,
   * on mobile devices, this will render within the document.body, but in
   * the context of a desktop device, this will render in the
   * provided DOM id.
   */
  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <Container
            as={m.div}
            exit={{pointerEvents: 'none'}}
            initial={{pointerEvents: 'auto'}}
          >
            <Background
              onClick={onDismiss}
              animate={{opacity: 1}}
              as={m.div}
              exit={{opacity: 0}}
              initial={{opacity: 0}}
            />
            <Frame
              animate="show"
              as={m.div}
              exit="exit"
              initial="exit"
              variants={PopoverVariants({isMobile, reducedMotion})}
            >
              {children}
            </Frame>
          </Container>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    portalElement,
  );
};
