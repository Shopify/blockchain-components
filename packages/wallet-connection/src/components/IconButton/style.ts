import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 20px;
  height: 20px;
  appearance: none;
  border: unset;
  outline: unset;
  background: unset;
  color: ${({theme}) => theme.colors.icons.default};
  cursor: pointer;

  &:hover {
    color: ${({theme}) => theme.colors.icons.hovered};
  }

  &:focus {
    color: ${({theme}) => theme.colors.icons.pressed};
  }
`;
