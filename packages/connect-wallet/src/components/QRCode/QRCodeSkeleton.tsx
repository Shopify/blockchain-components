import {m} from 'framer-motion';

import {Container} from './style';

export const QRCodeSkeleton = () => {
  return (
    <Container
      as={m.div}
      initial={{opacity: 1}}
      exit={{opacity: 0}}
      $aspectRatio="1 / 1"
    />
  );
};
