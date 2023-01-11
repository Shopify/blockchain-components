import styled from 'styled-components';
import {breakpoints} from 'shared';

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
  row-gap: 12px;
  margin-top: 12px;
`;

export const Center = styled.div`
  text-align: center;
`;

export const ConnectingWalletIcon = styled.div`
  margin: 24px auto;
`;

export const Divider = styled.hr`
  margin: 12px 0px;
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
  margin-bottom: 20px;
  // This is a combination of IconButton width + column-gap
  padding-left: ${({$padded}) => $padded && '36px'};

  h2 {
    max-width: 100%;
    flex: 1;
    line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
  }
`;

export const Icon = styled.div`
  height: 24px;
  width: 20px;

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
  margin-bottom: 24px;

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
  border-radius: ${({theme}) => theme.modal.borderRadius};
  box-shadow: ${({theme}) => theme.modal.boxShadow};
  padding: ${({theme}) => theme.modal.padding};

  @media ${breakpoints.smDown} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    max-width: unset;
    padding: 20px;
  }
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const WalletListItem = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: flex-start;

  p {
    margin: unset;
    text-align: left;
    font-size: 14px;
    line-height: 20px;

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
