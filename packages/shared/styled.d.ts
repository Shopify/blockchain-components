import 'styled-components';

declare module 'styled-components' {
  export interface ActionKey {
    default: string;
    hovered: string;
    pressed: string;
    depressed: string;
    disabled: string;
  }

  export interface InteractiveKey {
    default: string;
    hovered: string;
    depressed: string;
    disabled: string;
  }

  export interface DefaultTheme {
    colors: {
      action: {
        primary: ActionKey;
        secondary: ActionKey;
      };

      background: {
        backdrop: string;
        default: string;
      };

      icons: {
        default: string;
        subdued: string;
        hovered: string;
        pressed: string;
        disabled: string;
        critical: string;
        success: string;

        on: {
          critical: string;
          primary: string;
        };
      };

      interactive: {
        primary: InteractiveKey;
        critical: InteractiveKey;
      };

      text: {
        default: string;
        subdued: string;
        disabled: string;
        critical: string;
        success: string;

        on: {
          critical: string;
          primary: string;
        };
      };
    };
  }
}
