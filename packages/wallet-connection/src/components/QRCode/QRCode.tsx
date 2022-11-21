import {create, QRCode as QRCodeType} from 'qrcode';
import {ReactElement, useMemo} from 'react';
import {useTheme} from 'styled-components';

import {AppIcon, Container, IconContainer} from './style';
import {useWalletConnection} from '../../providers/WalletConnectionProvider';
import {getConnectorData} from '../../constants/connectors';

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

type Props = {
  uri: string;
  clearArea?: boolean;
};

export function QRCode({uri}: Props) {
  const matrix = generateMatrix(uri);
  const {modal, typography} = useTheme();
  const {pendingConnector} = useWalletConnection();
  const {icon} = getConnectorData(pendingConnector?.name);

  const foreground = typography.colorPrimary;
  const background = modal.background;

  const {length} = matrix;

  const dots = useMemo(() => {
    const svg: ReactElement[] = [];
    const cellSize = DEFAULT_QR_CODE_SIZE / length;

    const iconWhitespace = Math.floor((APP_LOGO_SIZE + 12) / cellSize);
    const whitespaceStart = length / 2 - iconWhitespace / 2;
    const whitespaceEnd = length / 2 + iconWhitespace / 2 - 1;

    let positioning = [
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
            key={`${i}-${x}-${y}`}
            fill={i % 2 ? background : foreground}
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

        const shouldRender = matrix[i][j] && inBounds && icon && !inMiddle;

        if (shouldRender) {
          svg.push(
            <circle
              key={`circle-${i}-${j}`}
              cx={i * cellSize + cellSize / 2}
              cy={j * cellSize + cellSize / 2}
              fill={foreground}
              r={2}
            />,
          );
        }
      });
    });

    return svg;
  }, [matrix, uri]);

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
        <AppIcon>{icon}</AppIcon>
      </IconContainer>
    </Container>
  );
}
