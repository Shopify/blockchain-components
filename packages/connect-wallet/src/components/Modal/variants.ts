import {Variants} from 'framer-motion';

import {EASE, MOBILE_SPRING} from '../../constants/transitions';

export const ModalReducedMotion: Variants = {
  exit: {
    opacity: 0,
    transition: EASE,
  },
  show: {
    opacity: 1,
    transition: EASE,
  },
};

export const ModalVariants = ({
  height,
  isSmall,
  reducedMotion,
}: {
  height: number;
  isSmall: boolean;
  reducedMotion: boolean | null;
}): Variants => {
  if (reducedMotion) {
    return ModalReducedMotion;
  }

  if (isSmall) {
    return {
      exit: {
        height,
        opacity: 0,
        y: '50%',
        transition: {
          height: EASE,
          opacity: EASE,
          y: MOBILE_SPRING,
        },
      },
      show: {
        height,
        opacity: 1,
        y: '0%',
        transition: {
          height: EASE,
          opacity: EASE,
          y: MOBILE_SPRING,
        },
      },
    };
  }

  return {
    exit: {
      height,
      opacity: 0,
      transition: EASE,
    },
    show: {
      height,
      opacity: 1,
      transition: EASE,
    },
  };
};
