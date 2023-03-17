import {m} from 'framer-motion';

export const QRCodeSkeleton = () => {
  return (
    <m.div
      className="sbc-relative sbc-w-full sbc-rounded-qrcode sbc-p-4 sbc-border-button-secondary"
      exit={{opacity: 0}}
      initial={{opacity: 1}}
    >
      <div className="sbc-aspect-w-1 sbc-aspect-h-1 sbc-w-full" />
    </m.div>
  );
};
