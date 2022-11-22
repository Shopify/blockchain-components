import {DefaultTheme} from 'styled-components';

export const Polaris: DefaultTheme = {
    typography: {
      colorPrimary: '#202223',
      colorSecondary: '#6D7175',
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
      background: '#008060',
      backgroundHover: '#006E52',
      border: 'none',
      borderRadius: '4px',
      textColor: '#FFFFFF',
      padding: '8px 16px',
      boxShadow:'0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.2)'
    },

    walletConnectorButton: {
      background: '#FFFFFF',
      backgroundHover: '#F6F6F7',
      border: '1px solid #BABFC3',
      borderRadius: '4px',
      textColor: '#202223',
      padding: '12px 24px',
      boxShadow:'0px 1px 0px rgba(0, 0, 0, 0.05)',
      horizontalAlignment: 'flex-start',
    },

    secondaryButton: {
      background: '#FFFFFF',
      backgroundHover: '#F6F6F7',
      border: '1px solid #BABFC3',
      borderRadius: '4px',
      textColor: '#202223',
      padding: '12px 24px',
      boxShadow:'0px 1px 0px rgba(0, 0, 0, 0.05)',
    },

    modal: {
      background: '#FFFFFF',
      overlayBackground: 'rgba(0, 0, 0, 0.5)',
      border: '',
      borderRadius: '5px',
      boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 26px 80px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    },

    popovers: {
      background: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      boxShadow: '0px 3px 6px -3px rgba(23, 24, 24, 0.08), 0px 8px 20px -4px rgba(23, 24, 24, 0.12)',
    },

    other: {
      iconColor: '#5C5F62',
      dividerColour: '#E1E3E5',
    }
}
