import {DefaultTheme} from 'styled-components';

namespace PolarisColors {
  export const Grayscale = {
    0: '#FFFFFF',
    1: '#F6F6F7',
    2: '#E1E3E5',
    3: '#BABFC3',
    4: '#6D7175',
    5: '#5C5F62',
    6: '#202223',
    7: 'rgba(0, 0, 0, 0.05)',
    8: 'rgba(0, 0, 0, 0.08)',
    9: 'rgba(0, 0, 0, 0.2)',
    10: 'rgba(23, 24, 24, 0.08)',
    11: 'rgba(23, 24, 24, 0.12)',
  };

  export const Reds = {
    0: '#D82C0D',
  };

  export const Greens = {
    0: '#008060',
    1: '#006E52',
  };
};

export const Polaris: DefaultTheme = {
  typography: {
    colorPrimary: PolarisColors.Grayscale['6'],
    colorSecondary: PolarisColors.Grayscale['4'],
    colorInteractive: '',
    colorCritical: '#D82C0D',

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
    }
  },

  connectButton: {
    background: PolarisColors.Greens['0'],
    backgroundHover: PolarisColors.Greens['1'],
    border: 'none',
    borderRadius: '4px',
    textColor: PolarisColors.Grayscale['0'],
    padding: '8px 16px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['8']}, inset 0px -1px 0px ${PolarisColors.Grayscale['9']}`
  },

  walletConnectorButton: {
    background: PolarisColors.Grayscale['0'],
    backgroundHover: PolarisColors.Grayscale['1'],
    border: `1px solid ${PolarisColors.Grayscale['3']}`,
    borderRadius: '4px',
    textColor: PolarisColors.Grayscale['6'],
    padding: '12px 24px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['7']}`,
    horizontalAlignment: 'flex-start',
  },

  secondaryButton: {
    background: PolarisColors.Grayscale['0'],
    backgroundHover: PolarisColors.Grayscale['1'],
    border: `1px solid ${PolarisColors.Grayscale['3']}`,
    borderRadius: '4px',
    textColor: PolarisColors.Grayscale['6'],
    padding: '12px 24px',
    boxShadow: `0px 1px 0px ${PolarisColors.Grayscale['7']}`,
  },

  modal: {
    background: PolarisColors.Grayscale['0'],
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
    border: '',
    borderRadius: '5px',
    boxShadow: `0px 0px 1px ${PolarisColors.Grayscale['9']}, 0px 26px 80px ${PolarisColors.Grayscale['9']}`,
    padding: '20px',
  },

  popovers: {
    background: PolarisColors.Grayscale['0'],
    border: 'none',
    borderRadius: '5px',
    boxShadow: `0px 3px 6px -3px ${PolarisColors.Grayscale['10']}, 0px 8px 20px -4px ${PolarisColors.Grayscale['11']}`,
  },

  other: {
    iconColor: PolarisColors.Grayscale['5'],
    dividerColour: PolarisColors.Grayscale['2'],
  },
};
