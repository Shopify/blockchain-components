import 'styled-components';

declare module 'styled-components' {
  export type Padding = string | {
    top: string;
    left: string;
    right: string;
    bottom: string;
  }

  export interface ButtonStyle {
    background: string;
    backgroundHover: string;
    border: string;
    borderRadius: string;
    textColor: string;
    boxShadow: string;
    padding: Padding;
  }

  export interface FontStyle {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  }

  export interface DefaultTheme {
    typography: {
      colorPrimary: string;
      colorSecondary: string;
      colorInteractive: string;
      colorCritical: string;

      heading: {
        fontFamily: string;
        fontWeight: string;

        h1: {
          fontSize: string;
          lineHeight: string;
        };
        h2: {
          fontSize: string;
          lineHeight: string;
        };

        h3: {
          fontSize: string;
          lineHeight: string;
        };
      };

      body: FontStyle;
    }

    connectButton: ButtonStyle;

    walletConnectorButton: ButtonStyle & {
      horizontalAlignment: string;
    }

    secondaryButton: ButtonStyle;

    modal: {
      background: string;
      overlayBackground: string;
      border: string;
      borderRadius: string;
      boxShadow: string;
      headingFontSize: string;
      headFontWeight: string;
      padding: Padding;
    }

    popovers: {
      background: string;
      border: string;
      borderRadius: string;
      boxShadow: string;
    }

    other: {
      iconColor: string;
      dividerColour: string;
    }
  }
}
