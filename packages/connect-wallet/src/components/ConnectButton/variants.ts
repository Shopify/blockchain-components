import {Variants} from 'framer-motion';

import {EASE, MOBILE_SPRING, SPRING} from '../../constants/transitions';

export const PopoverReducedMotionSmall: Variants = {
  exit: {
    opacity: 0,
    transition: EASE,
  },
  show: {
    opacity: 1,
    transition: EASE,
  },
};

export const PopoverSmall: Variants = {
  exit: {
    opacity: 0,
    y: '50%',
    transition: {
      opacity: EASE,
      y: MOBILE_SPRING,
    },
  },
  show: {
    opacity: 1,
    y: '0%',
    transition: {
      opacity: EASE,
      y: MOBILE_SPRING,
    },
  },
};

export const PopoverReducedMotionStandard: Variants = {
  exit: {
    opacity: 0,
    transition: EASE,
  },
  show: {
    opacity: 1,
    transition: EASE,
  },
};

export const PopoverStandard: Variants = {
  exit: {
    opacity: 0,
    y: '-20px',
    transition: {
      opacity: EASE,
      y: SPRING,
    },
  },
  show: {
    opacity: 1,
    y: '0px',
    transition: {
      opacity: EASE,
      y: SPRING,
    },
  },
};

export const PopoverVariants = ({
  isSmall,
  reducedMotion,
}: {
  isSmall: boolean;
  reducedMotion: boolean | null;
}): Variants => {
  if (isSmall) {
    return reducedMotion ? PopoverReducedMotionSmall : PopoverSmall;
  }

  return reducedMotion ? PopoverReducedMotionStandard : PopoverStandard;
};
