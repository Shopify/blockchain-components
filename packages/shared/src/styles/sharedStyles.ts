import {createGlobalStyle, css} from './styled';

/**
 * We restrict the use of `createGlobalStyle` because it affects all elements
 * rendered on a page and requires careful use. This file scopes all defined
 * styles to the packages in this monorepo (as well as the WalletConnect modal).
 */
export const GlobalStyles = createGlobalStyle`
  [id^=shopify-connect-wallet], [id^=shopify-tokengate], #walletconnect-wrapper {
    *:empty {
      display: block;
    }
  }
`;

export const NonEmptyElement = css`
  &:empty {
    display: block;
  }
`;
