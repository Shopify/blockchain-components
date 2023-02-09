import {breakpoints, ButtonWrapper} from 'shared';
import styled from 'styled-components';

export const Background = styled.div`
  display: none;

  @media ${breakpoints.smDown} {
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    background-color: ${({theme}) => theme.modal.overlayBackground};
    z-index: 1;
  }
`;

export const CaretIcon = styled.div`
  height: 20px;
  transform-origin: center;
  width: 20px;
`;

export const ConnectedButton = styled(ButtonWrapper)<{$popoverOpen: boolean}>`
  column-gap: 8px;
  color: ${({theme}) => theme.typography.colorPrimary};

  ${CaretIcon} {
    transform: ${({$popoverOpen}) =>
      $popoverOpen ? 'rotate(180deg)' : 'none'};
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 4px 0;
  min-width: 380px;
  /**
    * Required to appear over any badges, callouts, or notices
    * on some themes. This is the largest int supported, so it
    * should always take priority. This is primarily a problem
    * when apps or themes use high z-index banners, callouts, etc.
    */
  z-index: 2147483647;

  @media ${breakpoints.smDown} {
    position: fixed;
    top: 0;
    bottom: 0;
    padding: unset;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const Icon = styled.div`
  height: 12px;
  width: 12px;
`;

export const DelegateCounter = styled.div`
  background-color: #fafbfb;
  border-radius: 2px;
  display: flex;
  gap: 4px;
  padding: 4px;
  align-items: center;
`;


export const Frame = styled.div`
  background: ${({theme}) => theme.popovers.background};
  border: ${({theme}) => theme.popovers.border};
  border-radius: ${({theme}) => theme.popovers.borderRadius};
  box-shadow: ${({theme}) => theme.popovers.boxShadow};
  padding: 24px;
  row-gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  @media ${breakpoints.smDown} {
    border: unset;
    // Uses the devices safe-area-inset-bottom with an additional 24px added for consistent padding.
    padding-bottom: calc(24px + env(safe-area-inset-left, 24px));
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;
