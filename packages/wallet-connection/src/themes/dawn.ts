import {DefaultTheme} from 'styled-components';

namespace DawnColors {
    export const Grayscale = {
        0: '#FFFFFF',
        1: '#F0F0F0',
        2: '#D0D0D0',
        3: '#DFDFDF',
        4: '#7D7D7D',
        5: '#121212',
        6: '#000000',
        7: 'rgba(0, 0, 0, 0.5)',
    }

    export const Reds = {
        0: '#DE3618',
    }

    export const Greens = {
        0: '#108043',
    }

    export const Blues = {
        0: '#3752B2',
    }
}

export const Dawn: DefaultTheme = {
    typography: {
      fontFamily: 'Assistant',
      colorPrimary: DawnColors.Grayscale['5'],
      colorSecondary: DawnColors.Grayscale['6'],
      colorInteractive: '',
      colorCritical: DawnColors.Reds['0'],
    },

    connectButton: {
        background: DawnColors.Grayscale['5'],
        backgroundHover: '',
        border: 'none',
        borderRadius: '0',
        textColor: DawnColors.Grayscale['0'],
        padding: '',
        boxShadow:''
    },

    walletConnectorButton: {
        background: DawnColors.Grayscale['0'],
        backgroundHover: '',
        border: 'none',
        borderRadius: '0',
        textColor: DawnColors.Grayscale['0'],
        padding: '',
        boxShadow:'',
        horizontalAlignment: '',
    },

    secondaryButton: {
        background: DawnColors.Grayscale['5'],
        backgroundHover: '',
        border: 'none',
        borderRadius: '0',
        textColor: DawnColors.Grayscale['0'],
        padding: '',
        boxShadow:''
    },

    modal: {
      background: DawnColors.Grayscale['0'],
      overlayBackground: DawnColors.Grayscale['7'],
      border: '',
      borderRadius: '0',
      boxShadow: '',
      headingFontSize: '',
      headFontWeight: '',
      padding: '',
    },

    popovers: {
      background: '',
      border: '',
      borderRadius: '',
      boxShadown: '',
    },

    other: {
      iconColor: DawnColors.Grayscale['6'],
      dividerColour: DawnColors.Grayscale['3'],
    }
}
