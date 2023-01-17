import {create, QRCode as QRCodeType} from 'qrcode';
import {ReactElement, useMemo} from 'react';

import {useAppSelector} from '../../hooks/useAppState';
import {ConnectorIcon} from '../ConnectorIcon';

import {Circle, Container, IconContainer, Rect} from './style';

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
  uri: string;
}

export function QRCode({uri}: Props) {
  const matrix = generateMatrix(uri);
  const {pendingConnector} = useAppSelector((state) => state.wallet);

  const {length} = matrix;

  const dots = useMemo(() => {
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
          <Rect
            $isForeground={i % 2 === 0}
            key={`${i}-${x}-${y}`}
            rx={borderRadius}
            width={size}
            height={size}
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
            <Circle
              // eslint-disable-next-line react/no-array-index-key
              key={`circle-${i}-${j}`}
              cx={i * cellSize + cellSize / 2}
              cy={j * cellSize + cellSize / 2}
              r={2}
            />,
          );
        }
      });
    });

    return svg;
  }, [length, matrix]);

  return (
    <Container>
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${DEFAULT_QR_CODE_SIZE} ${DEFAULT_QR_CODE_SIZE}`}
      >
        {dots}
      </svg>

      <IconContainer>
        <ConnectorIcon id={pendingConnector?.id} size="Xl" />
      </IconContainer>
    </Container>
  );
}
