import styled from 'styled-components';

declare module 'styled-components' {
  export type Padding =
    | string
    | {
        top: string;
        left: string;
        right: string;
        bottom: string;
      };

  export interface ButtonStyle {
    background: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    padding: Padding;
    textColor: string;

    hover: {
      background?: string;
      outline?: string;
    };
  }

  export interface FontStyle {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;

    bold: {
      fontWeight: string;
    };
  }

  export interface DefaultTheme {
    typography: {
      colorPrimary: string;
      colorSecondary: string;
      colorInteractive: string;
      colorCritical: string;
      letterSpacing: string;

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
    };

    availableSoonButton: {
      background: string;
      border: string;
    };

    connectButton: ButtonStyle;

    modal: {
      background: string;
      overlayBackground: string;
      border: string;
      borderRadius: string;
      boxShadow: string;
      padding: Padding;
    };

    other: {
      iconColor: string;
      dividerColor: string;
    };

    popovers: {
      background: string;
      border: string;
      borderRadius: string;
      boxShadow: string;
    };

    secondaryButton: ButtonStyle;

    soldOutButton: {
      background: string;
      border: string;
      textColor: string;
    };

    tokenBase: {
      background: string;
    };

    walletConnectorButton: ButtonStyle & {
      horizontalAlignment: string;
    };
  }
}
