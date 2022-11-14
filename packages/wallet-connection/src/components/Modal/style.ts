import styled from 'styled-components';

export const Background = styled.div<{_visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.colors.background.backdrop};
  opacity: ${({_visible}) => (_visible ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 20px;
`;

export const Sheet = styled.div`
  background-color: ${({theme}) => theme.colors.background.default};
  max-width: 380px;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 26px 80px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  max-width: 100%;
  flex: 1;
  font-family: 'SF Pro Display', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin: unset;
  line-clamp: 2;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({theme}) => theme.colors.text.default};
`;
