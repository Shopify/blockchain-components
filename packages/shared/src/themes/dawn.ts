import {DefaultTheme} from 'styled-components';

namespace DawnColors {
    export const Grayscale = {
      0: '#FFFFFF',
      2: '#DFDFDF',
      3: '#121212',
      4: '#000000',
      5: 'rgba(0, 0, 0, 0.08)',
      6: 'rgba(18, 18, 18, 0.08)',
      7: 'rgba(18, 18, 18, 0.2)',
    }

    export const Reds = {
        0: '#DE3618',
    }

    export const Greens = {
        0: '#108043',
    }

    export const Blues = {
        0: '#0F1721',
    }
}

export const Dawn: DefaultTheme = {
    typography: {
      colorPrimary: DawnColors.Grayscale['3'],
      colorSecondary: DawnColors.Grayscale['4'],
      colorInteractive: '',
      colorCritical: DawnColors.Reds['0'],

      heading: {
        fontFamily: 'Assistant',
        fontWeight: '400',

        h1: {
          fontSize: '28px',
          lineHeight: '32px',
        },
        h2: {
          fontSize: '24px',
          lineHeight: '28px',
        },
        h3: {
          fontSize: '16px',
          lineHeight: '21px',
        },
      },

      body: {
        fontFamily: 'Assistant',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '18px',
      }
    },

    connectButton: {
      background: DawnColors.Grayscale['3'],
      backgroundHover: DawnColors.Grayscale['3'],
      border: 'none',
      borderRadius: '0',
      textColor: DawnColors.Grayscale['0'],
      padding: '12px 30px',
      boxShadow: 'none'
    },

    walletConnectorButton: {
      background: DawnColors.Grayscale['0'],
      backgroundHover: DawnColors.Grayscale['0'],
      border: `1px solid ${DawnColors.Grayscale['6']}`,
      borderRadius: '0',
      textColor: DawnColors.Blues['0'],
      padding: '12.5px 16px',
      boxShadow: 'none',
      horizontalAlignment: 'flex-start',
    },

    secondaryButton: {
      background: DawnColors.Grayscale['0'],
      backgroundHover: DawnColors.Grayscale['0'],
      border: `1px solid ${DawnColors.Grayscale['3']}`,
      borderRadius: '0',
      textColor: DawnColors.Grayscale['3'],
      padding: '8.5px 16px',
      boxShadow: 'none',
    },

    modal: {
      background: DawnColors.Grayscale['0'],
      overlayBackground: DawnColors.Grayscale['7'],
      border: `1px solid  ${DawnColors.Grayscale['6']}`,
      borderRadius: '0',
      boxShadow: `0px 8px 32px ${DawnColors.Grayscale['5']}`,
      padding: '24px',
    },

    popovers: {
      background: DawnColors.Grayscale['0'],
      border: `1px solid  ${DawnColors.Grayscale['6']}`,
      borderRadius: '0',
      boxShadow: 'none',
    },

    other: {
      iconColor: DawnColors.Grayscale['4'],
      dividerColour: DawnColors.Grayscale['2'],
    }
}
