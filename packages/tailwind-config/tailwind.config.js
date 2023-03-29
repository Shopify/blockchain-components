const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const defaultFont = defaultTheme.fontFamily.sans;

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
      animation: {
        spin: 'spin 500ms linear infinite',
      },
      lineHeight: {
        // Override default sizes to use pixels instead of REMs
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
      padding: {
        'button-large': 'var(--sbc-padding-button-large, 14px 20px)',
        'button-medium': 'var(--sbc-padding-button-medium, 10px 16px)',
        'button-small': 'var(--sbc-padding-button-small, 6px 12px)',
        popover: 'var(--sbc-padding-popover, 24px)',
        tokengate: 'var(--sbc-padding-tokengate, 20px)',
      },
      zIndex: {
        max: '2147483647',
      },
    },
    backgroundColor: {
      'address-chip': 'var(--sbc-bg-address-chip, #FAFBFB)',
      'address-chip-hover': 'var(--sbc-bg-address-chip-hover, #F6F6F7)',
      'button-disabled': 'var(--sbc-bg-button-disabled, #F1F1F1)',
      'button-disabled-hover': 'var(--sbc-bg-button-disabled-hover, #F1F1F1)',
      'button-primary': 'var(--sbc-bg-button-primary, #202223)',
      'button-primary-hover': 'var(--sbc-bg-button-primary-hover, #44474A)',
      'button-secondary': 'var(--sbc-bg-button-secondary, #FFFFFF)',
      'button-secondary-hover': 'var(--sbc-bg-button-secondary-hover, #F6F6F7)',
      divider: 'var(--sbc-bg-divider, #E1E3E5)',
      overlay: 'var(--sbc-bg-overlay, rgba(18, 18, 18, 0.2))',
      popover: 'var(--sbc-bg-popover, #FFFFFF)',
      skeleton: 'var(--sbc-bg-skeleton, #E4E5E7)',
      tokengate: 'var(--sbc-bg-tokengate, #FFFFFF)',
      transparent: 'transparent',
    },
    borderColor: {
      'button-disabled': 'var(--sbc-border-color-button-disabled, #202223)',
      'button-primary': 'var(--sbc-border-color-button-primary, unset)',
      'button-secondary': 'var(--sbc-border-color-button-secondary, #C9CCCF)',
      divider: 'var(--sbc-border-color-divider, #E1E3E5)',
      popover: 'var(--sbc-border-color-popover, unset)',
      tokengate: 'var(--sbc-border-color-tokengate, rgba(0, 0, 0, 0.12))',
    },
    borderRadius: {
      'button-large': 'var(--sbc-border-radius-button-large, 6px)',
      'button-medium': 'var(--sbc-border-radius-button-medium, 6px)',
      'button-small': 'var(--sbc-border-radius-button-small, 6px)',
      'popover-desktop': 'var(--sbc-border-radius-popover-desktop, 16px)',
      'popover-mobile':
        'var(--sbc-border-radius-popover-mobile, 32px 32px 0px 0px)',
      qrcode: 'var(--sbc-border-radius-qrcode, 16px)',
      tokengate: 'var(--sbc-border-radius-tokengate, 8px)',
      // Add the DEFAULT value -- DEFAULT is a Tailwind convention
      DEFAULT: defaultTheme.borderRadius.DEFAULT,
      full: defaultTheme.borderRadius.full,
      lg: '0.5rem',
    },
    borderWidth: {
      'button-disabled': 'var(--sbc-border-width-button-disabled, 0px)',
      'button-primary': 'var(--sbc-border-width-button-primary, 0px)',
      'button-secondary': 'var(--sbc-border-width-button-secondary, 1px)',
      divider: 'var(--sbc-border-width-divider, 1px)',
      popover: 'var(--sbc-border-width-popover, 0px)',
      tokengate: 'var(--sbc-border-width-tokengate, 1px)',
      0: '0',
    },
    boxShadow: {
      none: defaultTheme.boxShadow.none,
      'popover-desktop':
        'var(--sbc-box-shadow-popover-desktop, 0px 3px 6px -3px rgba(23, 24, 24, 0.08), 0px 8px 20px -4px rgba(23, 24, 24, 0.12))',
      'popover-mobile':
        'var(--sbc-box-shadow-popover-mobile, 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 26px 80px rgba(0, 0, 0, 0.2))',
      tokengate: 'var(--sbc-box-shadow-tokengate, unset)',
    },
    fill: {
      'qrcode-primary': 'var(--sbc-fill-qrcode-foreground, #202223)',
      'qrcode-secondary': 'var(--sbc-fill-qrcode-background, #FFFFFF)',
    },
    fontFamily: {
      'body-lg': `var(--sbc-font-family-body-lg, ${defaultFont})`,
      'body-md': `var(--sbc-font-family-body-md, ${defaultFont})`,
      'body-sm': `var(--sbc-font-family-body-sm, ${defaultFont})`,
      'heading-lg': `var(--sbc-font-family-heading-lg, ${defaultFont})`,
      'heading-md': `var(--sbc-font-family-heading-md, ${defaultFont})`,
      'heading-sm': `var(--sbc-font-family-heading-sm, ${defaultFont})`,
    },
    fontSize: {
      // Override default sizes to use pixels instead of REMs
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      // Custom sizes
      'body-lg': 'var(--sbc-font-size-body-lg, 16px)',
      'body-md': 'var(--sbc-font-size-body-md, 14px)',
      'body-sm': 'var(--sbc-font-size-body-sm, 12px)',
      'heading-lg': 'var(--sbc-font-size-heading-lg, 24px)',
      'heading-md': 'var(--sbc-font-size-heading-md, 20px)',
      'heading-sm': 'var(--sbc-font-size-heading-sm, 16px)',
    },
    fontWeight: {
      'body-lg': 'var(--sbc-font-weight-body-lg, 500)',
      'body-md': 'var(--sbc-font-weight-body-md, 400)',
      'body-sm': 'var(--sbc-font-weight-body-sm, 400)',
      'heading-lg': 'var(--sbc-font-weight-heading-lg, 600)',
      'heading-md': 'var(--sbc-font-weight-heading-md, 600)',
      'heading-sm': 'var(--sbc-font-weight-heading-sm, 500)',
    },
    lineHeight: {
      'body-lg': 'var(--sbc-line-height-body-lg, 20px)',
      'body-md': 'var(--sbc-line-height-body-md, 20px)',
      'body-sm': 'var(--sbc-line-height-body-sm, 16px)',
      'heading-lg': 'var(--sbc-line-height-heading-lg, 28px)',
      'heading-md': 'var(--sbc-line-height-heading-md, 24px)',
      'heading-sm': 'var(--sbc-line-height-heading-sm, 20px)',
      none: 0,
    },
    maxWidth: {
      // Override default sizes to use pixels instead of REMs
      xs: '320px',
      sm: '384px',
      md: '448px',
      lg: '512px',
      xl: '576px',
      '2xl': '672px',
      '3xl': '768px',
      '4xl': '896px',
      '5xl': '1024px',
      '6xl': '1152px',
      '7xl': '1280px',
    },
    textColor: {
      'address-chip': 'var(--sbc-text-color-address-chip, #202223)',
      'button-disabled': 'var(--sbc-text-color-button-disabled, #8C9196)',
      'button-primary': 'var(--sbc-text-color-button-primary, #FFFFFF)',
      'button-secondary': 'var(--sbc-text-color-button-secondary, #202223)',
      critical: 'var(--sbc-text-color-critical, #D72C0D)',
      disabled: 'var(--sbc-text-color-disabled, #8C9196)',
      primary: 'var(--sbc-text-color-primary, #202223)',
      secondary: 'var(--sbc-text-color-secondary, #6D7175)',
      inherit: 'inherit',
    },
    spacing: {
      // Override default sizes to use pixels instead of REMs
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
  },
  corePlugins: {
    aspectRatio: false,
    borderStyle: false,
    preflight: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    /**
     * Custom border styles for the blockchain components
     *
     * These are defined as a plugin since providing them to the
     * theme object above does not add the border styles to the
     * utilities layer as expected.
     */
    plugin(function ({addUtilities}) {
      addUtilities({
        '.border-button-disabled': {
          'border-style': 'var(--sbc-border-style-button-disabled, unset)',
        },
        '.border-button-primary': {
          'border-style': 'var(--sbc-border-style-button-primary, unset)',
        },
        '.border-button-secondary': {
          'border-style': 'var(--sbc-border-style-button-secondary, solid)',
        },
        '.border-divider': {
          'border-style': 'var(--sbc-border-style-divider, solid)',
        },
        '.border-b-divider': {
          'border-bottom-style': 'var(--sbc-border-style-divider, solid)',
        },
        '.border-none': {
          'border-style': 'unset',
        },
        '.border-popover': {
          'border-style': 'var(--sbc-border-style-popover, unset)',
        },
        '.border-tokengate': {
          'border-style': 'var(--sbc-border-style-tokengate, solid)',
        },
      });
    }),
  ],
};
