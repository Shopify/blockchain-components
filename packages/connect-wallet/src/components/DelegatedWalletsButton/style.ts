import {ButtonWrapper} from 'shared';
import styled from 'styled-components';

export const CaretIcon = styled.div`
  height: 20px;
  transform-origin: center;
  width: 20px;
`;

export const DelegatedWalletsButtonWrapper = styled(ButtonWrapper)<{
  $addressDetailsVisible: boolean;
}>`
  column-gap: 8px;
  color: ${({theme}) => theme.typography.colorPrimary};
  border: 0;
  background-color: #fafbfb;
  ${CaretIcon} {
    transform: ${({$addressDetailsVisible}) =>
      $addressDetailsVisible ? 'rotate(180deg)' : 'none'};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: #fafbfb;
`;

export const Icon = styled.div`
  height: 20px;
  width: 20px;
`;

export const List = styled.ul`
  padding: 8px 0;
  list-style: none;
`;

export const ListItem = styled.li`
  text-align: left;
`;

export const Divider = styled.div`
  border-top: 1px solid ${({theme}) => theme.other.dividerColor};
`;
