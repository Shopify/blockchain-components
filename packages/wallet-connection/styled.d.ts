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

  export interface DefaultTheme {
    typography: {
      fontFamily: string;
      colorPrimary: string;
      colorSecondary: string;
      colorInteractive: string;
      colorCritical: string;
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
      boxShadown: string;
    }

    other: {
      iconColor: string;
      dividerColour: string;
    }
  }
}
