/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/no-namespace */
import {Theme} from '../types/theme';

namespace DawnColors {
  export const Grayscale = {
    0: '#FFFFFF', // base background
    1: '#F1F1F1', // button, disabled
    2: '#E1E3E5', // divider
    3: '#787878', // border, secondary
    4: '#8C9196', // text, disabled
    5: '#6D7175', // text, secondary
    6: '#202223', // text, primary
    7: 'rgba(0, 0, 0, 0.08)',
    8: 'rgba(18, 18, 18, 0.2)',
  };

  export const Reds = {
    0: '#DE3618',
  };

  export const Greens = {
    0: '#108043',
  };

  export const Blues = {
    0: '#0F1721',
  };
}

export const Dawn: Theme = {
  typography: {
    colorPrimary: DawnColors.Grayscale['6'],
    colorSecondary: DawnColors.Grayscale['5'],
    colorCritical: DawnColors.Reds['0'],
    colorDisabled: DawnColors.Grayscale['4'],
    letterSpacing: '0.5px',

    heading: {
      fontFamily: 'Assistant, sans-serif',
      fontWeight: '400',
      h1: {
        fontSize: '28px',
        lineHeight: '32px',
      },
      h2: {
        fontSize: '22px',
        lineHeight: '24px',
      },
      h3: {
        fontSize: '16px',
        lineHeight: '21px',
      },
    },

    body: {
      fontFamily: 'Assistant, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',

      bold: {
        fontWeight: '600',
      },
    },
  },

  connectButton: {
    background: DawnColors.Grayscale['6'],
    backgroundDisabled: DawnColors.Grayscale['1'],
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    padding: '12px 30px',
    textColor: DawnColors.Grayscale['0'],

    hover: {
      outline: `1.3px solid ${DawnColors.Grayscale['6']}`,
    },
  },

  modal: {
    background: DawnColors.Grayscale['0'],
    border: DawnColors.Grayscale['2'],
    borderRadius: '0',
    boxShadow: `0px 8px 32px ${DawnColors.Grayscale['7']}`,
    overlayBackground: DawnColors.Grayscale['8'],
    padding: '24px',
  },

  other: {
    iconColor: DawnColors.Grayscale['4'],
    dividerColor: DawnColors.Grayscale['2'],
  },

  popovers: {
    background: DawnColors.Grayscale['0'],
    border: `1px solid  ${DawnColors.Grayscale['2']}`,
    borderRadius: '0',
    boxShadow: `0px 3px 6px -3px rgba(23, 24, 24, 0.08),
    0px 8px 20px -4px rgba(23, 24, 24, 0.12)`,
  },

  secondaryButton: {
    background: DawnColors.Grayscale['0'],
    border: `1px solid ${DawnColors.Grayscale['3']}`,
    borderRadius: '0',
    boxShadow: 'none',
    padding: '8.5px 16px',
    textColor: DawnColors.Grayscale['6'],

    hover: {
      outline: `1.3px solid ${DawnColors.Grayscale['6']}`,
    },
  },

  walletConnectorButton: {
    background: DawnColors.Grayscale['0'],
    border: `1px solid ${DawnColors.Grayscale['3']}`,
    borderRadius: '0',
    boxShadow: 'none',
    padding: '12.5px 16px',
    textColor: DawnColors.Grayscale['6'],
    horizontalAlignment: 'flex-start',

    hover: {
      outline: `1.3px solid ${DawnColors.Grayscale['6']}`,
    },
  },
};
