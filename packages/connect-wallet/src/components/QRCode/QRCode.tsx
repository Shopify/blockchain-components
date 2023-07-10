import {AnimatePresence, domAnimation, LazyMotion, m} from 'framer-motion';
import {create, QRCode as QRCodeType} from 'qrcode';
import {ReactElement, useMemo} from 'react';
import {Spinner} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';

import {useStore} from '~/state';

const APP_LOGO_SIZE = 88;
const DEFAULT_QR_CODE_SIZE = 380;

const generateMatrix = (value: string) => {
  const qrCode = create(value, {errorCorrectionLevel: 'quartile'});
  const arr = Array.prototype.slice.call(qrCode.modules.data, 0);
  const sqrt = Math.sqrt(arr.length);

  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [],
  );
};

interface Props {
  uri?: string;
}

export function QRCode({uri}: Props) {
  const {pendingConnector} = useStore((state) => state.wallet);

  const dots = useMemo(() => {
    if (!uri) {
      return null;
    }

    const matrix = generateMatrix(uri);
    const {length} = matrix;

    const svg: ReactElement[] = [];
    const cellSize = DEFAULT_QR_CODE_SIZE / length;

    const iconWhitespace = Math.floor((APP_LOGO_SIZE + 12) / cellSize);
    const whitespaceStart = length / 2 - iconWhitespace / 2;
    const whitespaceEnd = length / 2 + iconWhitespace / 2 - 1;

    const positioning = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 1},
    ];

    positioning.forEach(({x, y}) => {
      const x1 = (length - 7) * cellSize * x;
      const y1 = (length - 7) * cellSize * y;

      for (let i = 0; i < 3; i++) {
        const borderRadius = (i - 2) * -5 + (i === 0 ? 2 : 3);
        const size = cellSize * (7 - i * 2);

        svg.push(
          <rect
            className={
              i % 2 === 0
                ? 'sbc-fill-qrcode-primary'
                : 'sbc-fill-qrcode-secondary'
            }
            key={`${i}-${x}-${y}`}
            height={size}
            rx={borderRadius}
            width={size}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />,
        );
      }
    });

    matrix.forEach((row: QRCodeType[], i: number) => {
      row.forEach((_, j: number) => {
        const inBounds = !(
          (i < 7 && j < 7) ||
          (i > length - 8 && j < 7) ||
          (i < 7 && j > length - 8)
        );

        const inMiddle =
          i > whitespaceStart &&
          i < whitespaceEnd &&
          j > whitespaceStart &&
          j < whitespaceEnd;

        const shouldRender = matrix[i][j] && inBounds && !inMiddle;

        if (shouldRender) {
          svg.push(
            <circle
              className="sbc-fill-qrcode-primary"
              cx={i * cellSize + cellSize / 2}
              cy={j * cellSize + cellSize / 2}
              // eslint-disable-next-line react/no-array-index-key
              key={`circle-${i}-${j}`}
              r={2}
            />,
          );
        }
      });
    });

    return svg;
  }, [uri]);

  return (
    <div className="sbc-relative sbc-w-full sbc-rounded-qrcode sbc-p-4 sbc-border-button-secondary">
      <div className="sbc-relative sbc-aspect-square sbc-w-full sbc-overflow-hidden">
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {dots ? (
              <m.div
                animate={{opacity: 1}}
                className="sbc-h-full sbc-w-full"
                initial={{opacity: 0}}
              >
                <svg
                  height="100%"
                  width="100%"
                  viewBox={`0 0 ${DEFAULT_QR_CODE_SIZE} ${DEFAULT_QR_CODE_SIZE}`}
                >
                  {dots}
                </svg>

                <div className="sbc-absolute sbc-inset-0 sbc-flex sbc-items-center sbc-justify-center">
                  <ConnectorIcon id={pendingConnector?.id} size="xl" />
                </div>
              </m.div>
            ) : (
              <m.div
                animate={{opacity: 0}}
                className="sbc-absolute sbc-inset-0 sbc-flex sbc-flex-col sbc-justify-center"
                exit={{opacity: 0}}
                initial={{opacity: 1}}
              >
                <Spinner />
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </div>
  );
}
