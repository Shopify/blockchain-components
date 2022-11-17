import {DefaultTheme} from 'styled-components';

export const Polaris: DefaultTheme = {
  colors: {
    action: {
      primary: {
        default: '#008060',
        hovered: '#006E52',
        pressed: '#005E46',
        depressed: '#003D2C',
        disabled: '#F1F1F1',
      },

      secondary: {
        default: '#FFFFFF',
        hovered: '#F6F6F7',
        pressed: '#F1F2F3',
        depressed: '#6D7175',
        disabled: '#FFFFFF',
      },
    },

    background: {
      backdrop: 'rgba(0, 0, 0, 0.5)',
      default: '#FFFFFF',
    },

    icons: {
      default: '#5C5F62',
      subdued: '#8C9196',
      hovered: '#1A1C1D',
      pressed: '#44474A',
      disabled: '#BABEC3',
      critical: '#D72C0D',
      success: '#007F5F',

      on: {
        critical: '#FFFFFF',
        primary: '#FFFFFF',
      },
    },

    interactive: {
      primary: {
        default: '#2C6ECB',
        hovered: '#1F5199',
        depressed: '#103262',
        disabled: '#BDC1CC',
      },

      critical: {
        default: '#D82C0D',
        hovered: '#CD290C',
        depressed: '#FD938D',
        disabled: '#670F03',
      },
    },

    text: {
      default: '#202223',
      subdued: '#6D7175',
      disabled: '#8C9196',
      critical: '#D72C0D',
      success: '#008060',

      on: {
        critical: '#FFFFFF',
        primary: '#FFFFFF',
      },
    },
  },
};
