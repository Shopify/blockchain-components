import {CSSProperties} from 'react';
import {breakpoints, styled} from 'shared';

export const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.modal.overlayBackground};
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;

  @media ${breakpoints.smDown} {
    a,
    button {
      width: 100%;
    }
  }
`;

export const Center = styled.div`
  text-align: center;

  h3 {
    margin-bottom: 8px;
  }

  p {
    margin: 0;
  }
`;

export const ConnectingWalletIcon = styled.div`
  margin: 24px auto 0;
`;

export const GetAWalletContent = styled.div`
  align-self: center;

  h3,
  p {
    text-align: center;
  }

  p {
    margin-bottom: 24px;
  }
`;

export const Header = styled.div<{$padded?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  padding: ${({theme}) => theme.modal.padding};

  h2 {
    max-width: 100%;
    flex: 1;
    line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;

    // This is a combination of IconButton width + column-gap
    padding-left: ${({$padded}) => $padded && '36px'};
  }
`;

export const Icon = styled.div`
  height: 36px;
  width: 36px;
  color: ${({theme}) => theme.typography.colorPrimary};

  svg {
    /**
     * Not sure of the best way to handle this at the moment, but per design
     * the icon is centered with the header, so we'll use static values for
     * the time being.
     */
    margin-top: 2px;
  }
`;

export const ListItemContent = styled.div`
  p {
    margin: 4px 0px 0px 0px;
  }

  h3 {
    margin-bottom: 4px;
  }
`;

export const Sheet = styled.div`
  max-width: 380px;
  position: relative;
  z-index: 10;
  width: 100%;
  background-color: ${({theme}) => theme.modal.background};
  border: ${({theme}) => theme.modal.border};
  border-radius: ${({theme}) => theme.modal.borderRadius.desktop};
  box-shadow: ${({theme}) => theme.modal.boxShadow};
  overflow: hidden;

  @media ${breakpoints.smDown} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-radius: ${({theme}) => theme.modal.borderRadius.mobile};
    max-width: unset;
  }
`;

export const SheetContent = styled.div<{rowGap?: CSSProperties['rowGap']}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({theme}) => theme.modal.padding};
  padding-top: 0;
  row-gap: ${({rowGap}) => rowGap};
`;

export const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 12px 0;
`;

export const WalletListItem = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: flex-start;

  p {
    margin: unset;

    & + p {
      margin: default;
    }
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /**
    * Required to appear over any badges, callouts, or notices
    * on some themes. This is the largest int supported, so it
    * should always take priority. This is primarily a problem
    * when apps or themes use high z-index banners, callouts, etc.
    */
  z-index: 2147483647;

  @media ${breakpoints.smDown} {
    align-items: flex-end;
  }

  ${Background}, ${Sheet} {
    pointer-events: inherit;
  }
`;
