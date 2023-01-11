/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/no-namespace */
import {DefaultTheme} from 'styled-components';

namespace PolarisColors {
  export const Grayscale = {
    0: '#FFFFFF', // background, base
    1: '#F6F6F7', // button, disabled
    2: '#E1E3E5', // divider
    3: '#BABFC3', // border, secondary button
    4: '#8C9196', // text, disabled
    5: '#6D7175', // text, secondary
    6: '#5C5F62', // icon colour
    7: '#202223', // text, primary
    8: 'rgba(0, 0, 0, 0.05)',
    9: 'rgba(0, 0, 0, 0.08)',
    10: 'rgba(0, 0, 0, 0.2)',
    11: 'rgba(23, 24, 24, 0.08)',
    12: 'rgba(23, 24, 24, 0.12)',
  };

  export const Reds = {
    0: '#D82C0D',
  };

  export const Greens = {
    0: '#008060',
    1: '#006E52',
  };
}

export const Polaris: DefaultTheme = {
  typography: {
    colorPrimary: PolarisColors.Grayscale['7'],
    colorSecondary: PolarisColors.Grayscale['5'],
    colorCritical: PolarisColors.Reds['0'],
    colorDisabled: PolarisColors.Grayscale['4'],
    letterSpacing: '0px',

    heading: {
      fontFamily: 'SF Pro Display',
      fontWeight: '600',

      h1: {
        fontSize: '24px',
        lineHeight: '28px',
      },
      h2: {
        fontSize: '20px',
        lineHeight: '24px',
      },
      h3: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },

    body: {
      fontFamily: 'SF Pro Text',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',

      bold: {
        fontWeight: '600',
      },
    },
  },

  connectButton: {
    background: PolarisColors.Greens['0'],
    backgroundDisabled: PolarisColors.Grayscale['1'],
    border: 'none',
    borderRadius: '4px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['9']}, inset 0px -1px 0px ${PolarisColors.Grayscale['10']}`,
    padding: '8px 16px',
    textColor: PolarisColors.Grayscale['0'],

    hover: {
      background: PolarisColors.Greens['1'],
    },
  },

  modal: {
    background: PolarisColors.Grayscale['0'],
    border: '',
    borderRadius: '5px',
    boxShadow: `0px 0px 1px ${PolarisColors.Grayscale['10']}, 0px 26px 80px ${PolarisColors.Grayscale['10']}`,
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
  },

  other: {
    iconColor: PolarisColors.Grayscale['6'],
    dividerColor: PolarisColors.Grayscale['2'],
  },

  popovers: {
    background: PolarisColors.Grayscale['0'],
    border: 'none',
    borderRadius: '5px',
    boxShadow: `0px 3px 6px -3px ${PolarisColors.Grayscale['11']}, 0px 8px 20px -4px ${PolarisColors.Grayscale['12']}`,
  },

  secondaryButton: {
    background: PolarisColors.Grayscale['0'],
    border: `1px solid ${PolarisColors.Grayscale['3']}`,
    borderRadius: '4px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['8']}`,
    padding: '12px 24px',
    textColor: PolarisColors.Grayscale['7'],

    hover: {
      background: PolarisColors.Grayscale['1'],
    },
  },

  walletConnectorButton: {
    background: PolarisColors.Grayscale['0'],
    border: `1px solid ${PolarisColors.Grayscale['3']}`,
    borderRadius: '4px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['8']}`,
    padding: '12px 24px',
    textColor: PolarisColors.Grayscale['7'],
    horizontalAlignment: 'flex-start',

    hover: {
      background: PolarisColors.Grayscale['1'],
    },
  },
};
