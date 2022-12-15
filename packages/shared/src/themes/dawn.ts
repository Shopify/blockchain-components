/* eslint-disable @typescript-eslint/no-namespace */
import {DefaultTheme} from 'styled-components';

namespace DawnColors {
  export const Grayscale = {
    0: '#FFFFFF',
    1: '#DFDFDF',
    2: '#121212',
    3: '#5C5F62',
    4: 'rgba(0, 0, 0, 0.08)',
    5: 'rgba(18, 18, 18, 0.55)',
    6: 'rgba(18, 18, 18, 0.2)',
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

export const Dawn: DefaultTheme = {
  typography: {
    colorPrimary: DawnColors.Grayscale['2'],
    colorSecondary: DawnColors.Grayscale['3'],
    colorInteractive: '',
    colorCritical: DawnColors.Reds['0'],
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

  availableSoonButton: {
    background: DawnColors.Grayscale['1'],
    border: 'none',
  },

  connectButton: {
    background: DawnColors.Grayscale['2'],
    backgroundHover: DawnColors.Grayscale['2'],
    border: 'none',
    borderRadius: '0',
    textColor: DawnColors.Grayscale['0'],
    padding: '12px 30px',
    boxShadow: 'none',
  },

  modal: {
    background: DawnColors.Grayscale['0'],
    overlayBackground: DawnColors.Grayscale['6'],
    border: 'none',
    borderRadius: '0',
    boxShadow: `0px 8px 32px ${DawnColors.Grayscale['4']}`,
    padding: '24px',
  },

  other: {
    iconColor: DawnColors.Grayscale['3'],
    dividerColor: DawnColors.Grayscale['1'],
  },

  popovers: {
    background: DawnColors.Grayscale['0'],
    border: `1px solid  ${DawnColors.Grayscale['5']}`,
    borderRadius: '0',
    boxShadow: 'none',
  },

  soldOutButton: {
    background: DawnColors.Grayscale['0'],
    border: `1px solid`,
    textColor: DawnColors.Grayscale['2'],
  },

  secondaryButton: {
    background: DawnColors.Grayscale['0'],
    backgroundHover: DawnColors.Grayscale['0'],
    border: `1px solid ${DawnColors.Grayscale['2']}`,
    borderRadius: '0',
    textColor: DawnColors.Grayscale['2'],
    padding: '8.5px 16px',
    boxShadow: 'none',
  },

  tokenBase: {
    background: DawnColors.Grayscale['2'],
    textColor: DawnColors.Grayscale['2'],
  },

  walletConnectorButton: {
    background: DawnColors.Grayscale['0'],
    backgroundHover: DawnColors.Grayscale['0'],
    border: `1px solid ${DawnColors.Grayscale['5']}`,
    borderRadius: '0',
    textColor: DawnColors.Blues['0'],
    padding: '12.5px 16px',
    boxShadow: 'none',
    horizontalAlignment: 'flex-start',
  },
};
