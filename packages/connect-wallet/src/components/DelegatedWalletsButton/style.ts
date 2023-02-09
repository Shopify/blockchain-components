import styled from 'styled-components';

export const CaretIcon = styled.div`
  height: 20px;
  transform-origin: center;
  width: 20px;
`;

export const DelegatedWalletsButtonWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  width: 100%;
  gap: 8px;
  padding: 16px 16px 0px 16px;
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: #fafbfb;
  width: 100%;
  border-radius: 8px;
  margin: 0px;
`;

export const Icon = styled.div`
  height: 16px;
  width: 16px;
`;

export const List = styled.ul`
  padding: 8px 0;
  list-style: none;
  margin: 0;
`;

export const ListItem = styled.li`
  text-align: left;
`;

export const Divider = styled.div`
  border-top: 1px solid ${({theme}) => theme.other.dividerColor};
  margin: 0px 16px;
`;
