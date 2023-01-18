/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/no-namespace */
import {Theme} from '../types/theme';

namespace DefaultColors {
  export const Grayscale = {
    0: '#FFFFFF', // base background
    1: '#F1F1F1', // button, disabled
    2: '#E1E3E5', // divider
    3: '#C9CCCF', // border, secondary
    4: '#8C9196', // text, disabled
    5: '#6D7175', // text, secondary
    6: '#5C5F62', // icon
    7: '#202223', // button & text, primary
  };

  export const Reds = {
    0: '#D72C0D',
  };
}

export const Default: Theme = {
  name: 'default',

  typography: {
    colorPrimary: DefaultColors.Grayscale['7'],
    colorSecondary: DefaultColors.Grayscale['5'],
    colorCritical: DefaultColors.Reds['0'],
    colorDisabled: DefaultColors.Grayscale['4'],

    bodyLg: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '20px',
    },

    bodyMd: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
    },

    bodySm: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16px',
    },

    headingLg: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '28px',
    },

    headingMd: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '24px',
    },

    headingSm: {
      fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '20px',
    },
  },

  connectButton: {
    background: DefaultColors.Grayscale['7'],
    border: 'none',
    borderRadius: '6px',
    boxShadow: 'none',
    padding: '12px 30px',
    textColor: DefaultColors.Grayscale['0'],

    hover: {
      outline: `1.3px solid ${DefaultColors.Grayscale['7']}`,
    },
  },

  disabledButton: {
    background: DefaultColors.Grayscale['1'],
    textColor: DefaultColors.Grayscale['4'],
  },

  modal: {
    background: DefaultColors.Grayscale['0'],
    border: 'none',
    boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.2), 0px 26px 80px rgba(0, 0, 0, 0.2)`,
    overlayBackground: 'rgba(18, 18, 18, 0.2)',
    padding: '24px',

    borderRadius: {
      desktop: '16px',
      mobile: '32px 32px 0px 0px',
    },
  },

  other: {
    iconColor: DefaultColors.Grayscale['5'],
    dividerColor: DefaultColors.Grayscale['2'],
  },

  popovers: {
    background: DefaultColors.Grayscale['0'],
    border: 'none',
    borderRadius: '8px',
    boxShadow: `0px 3px 6px -3px rgba(23, 24, 24, 0.08),
    0px 8px 20px -4px rgba(23, 24, 24, 0.12)`,
  },

  secondaryButton: {
    background: DefaultColors.Grayscale['0'],
    border: `1px solid ${DefaultColors.Grayscale['3']}`,
    borderRadius: '6px',
    boxShadow: 'none',
    padding: '12px 30px',
    textColor: DefaultColors.Grayscale['7'],

    hover: {
      outline: `1.3px solid ${DefaultColors.Grayscale['7']}`,
    },
  },

  tokengate: {
    background: DefaultColors.Grayscale['0'],
    border: `1px solid rgba(0, 0, 0, 0.12);`,
    borderRadius: '8px',
    boxShadow: 'none',
    padding: '16px',
  },

  walletConnectorButton: {
    background: DefaultColors.Grayscale['0'],
    border: `1px solid ${DefaultColors.Grayscale['3']}`,
    borderRadius: '6px',
    boxShadow: 'none',
    padding: '12px 16px',
    textColor: DefaultColors.Grayscale['7'],
    horizontalAlignment: 'flex-start',

    hover: {
      outline: `0px 0px 0px 1px ${DefaultColors.Grayscale['7']}`,
    },
  },
};
