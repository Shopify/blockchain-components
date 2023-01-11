import {breakpoints, ButtonWrapper} from 'shared';
import styled from 'styled-components';

export const AddressChip = styled.button`
  appearance: none;
  outline: unset;
  border: unset;
  display: flex;
  align-items: center;
  background-color: #fafbfb;
  padding: 8px 12px;
  border-radius: 32px;
  column-gap: 12px;
  cursor: pointer;
  color: #202223;

  &:hover {
    background-color: #f6f6f7;
  }
`;

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

export const ConnectedButton = styled(ButtonWrapper)`
  column-gap: 8px;

  &:hover {
    ${CaretIcon} {
      transform: rotate(180deg);
    }
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 4px 0;
  min-width: 280px;
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
