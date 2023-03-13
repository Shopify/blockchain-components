const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Using SBC for now
  // [S]hopify [B]lockchain [C]omponents
  prefix: 'sbc-',
  content: [
    '../../packages/connect-wallet/src/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
    '../../packages/tokengate/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      padding: {
        'button-large': '14px 20px',
        'button-medium': '10px 16px',
        'button-small': '6px 12px',
        modal: '24px',
        tokengate: '20px',
      },
    },
    animation: {
      spin: 'spin 500ms linear infinite',
    },
    backgroundColor: {
      'button-disabled': '#F1F1F1',
      'button-disabled-hover': '#F1F1F1',
      'button-primary': '#202223',
      'button-primary-hover': '#44474A',
      'button-secondary': '#FFFFFF',
      'button-secondary-hover': '#F6F6F7',
      divider: '#E1E3E5',
      modal: '#FFFFFF',
      overlay: 'rgba(18, 18, 18, 0.2)',
      popover: '#FFFFFF',
      skeleton: '#E4E5E7',
      tokengate: '#FFFFFF',
      transparent: 'transparent',
    },
    borderColor: {
      'button-disabled': '#202223',
      'button-primary': 'unset',
      'button-secondary': '#C9CCCF',
      modal: 'unset',
      popover: 'unset',
      tokengate: 'rgba(0, 0, 0, 0.12)',
    },
    borderRadius: {
      'button-large': '6px',
      'button-medium': '6px',
      'button-small': '6px',
      'modal-desktop': '16px',
      'modal-mobile': '32px 32px 0px 0px',
      popover: '8px',
      tokengate: '8px',
      // Add the DEFAULT value -- DEFAULT is a Tailwind convention
      DEFAULT: defaultTheme.borderRadius.DEFAULT,
      full: defaultTheme.borderRadius.full,
    },
    borderStyle: {
      'button-disabled': 'unset',
      'button-primary': 'unset',
      'button-secondary': 'solid',
      modal: 'unset',
      none: 'unset',
      popover: 'unset',
      tokengate: 'solid',
    },
    borderWidth: {
      'button-disabled': '0px',
      'button-primary': '0px',
      'button-secondary': '1px',
      tokengate: '1px',
    },
    boxShadow: {
      modal: '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 26px 80px rgba(0, 0, 0, 0.2)',
      none: defaultTheme.boxShadow.none,
      popover:
        '0px 3px 6px -3px rgba(23, 24, 24, 0.08), 0px 8px 20px -4px rgba(23, 24, 24, 0.12)',
      tokengate: 'unset',
    },
    fontFamily: {
      'body-lg': defaultTheme.fontFamily.sans,
      'body-md': defaultTheme.fontFamily.sans,
      'body-sm': defaultTheme.fontFamily.sans,
      'heading-lg': defaultTheme.fontFamily.sans,
      'heading-md': defaultTheme.fontFamily.sans,
      'heading-sm': defaultTheme.fontFamily.sans,
    },
    fontSize: {
      'body-lg': defaultTheme.fontSize.base,
      'body-md': defaultTheme.fontSize.sm,
      'body-sm': defaultTheme.fontSize.xs,
      'heading-lg': defaultTheme.fontSize['2xl'],
      'heading-md': defaultTheme.fontSize.xl,
      'heading-sm': defaultTheme.fontSize.base,
    },
    fontWeight: {
      'body-lg': defaultTheme.fontWeight.medium,
      'body-md': defaultTheme.fontWeight.normal,
      'body-sm': defaultTheme.fontWeight.normal,
      'heading-lg': defaultTheme.fontWeight.semibold,
      'heading-md': defaultTheme.fontWeight.semibold,
      'heading-sm': defaultTheme.fontWeight.medium,
    },
    lineHeight: {
      'body-lg': defaultTheme.lineHeight[5],
      'body-md': defaultTheme.lineHeight[5],
      'body-sm': defaultTheme.lineHeight[4],
      'heading-lg': defaultTheme.lineHeight[7],
      'heading-md': defaultTheme.lineHeight[6],
      'heading-sm': defaultTheme.lineHeight[5],
    },
    textColor: {
      'button-disabled': '#8C9196',
      'button-primary': '#FFFFFF',
      'button-secondary': '#202223',
      critical: '#D72C0D',
      disabled: '#8C9196',
      primary: '#202223',
      secondary: '#6D7175',
      // Holding on icon for now -- will use secondary in the meantime.
      // icon: '#6D7175',
    },
  },
  plugins: [],
};
