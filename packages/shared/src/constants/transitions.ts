import {Transition} from 'framer-motion';

export const EASE: Transition = {
  ease: 'easeInOut',
  duration: 0.2,
};

export const MOBILE_SPRING: Transition = {
  type: 'spring',
  damping: 24,
  stiffness: 220,
  duration: 0.2,
};

export const SPRING: Transition = {
  type: 'spring',
  stiffness: 220,
  duration: 0.2,
};
