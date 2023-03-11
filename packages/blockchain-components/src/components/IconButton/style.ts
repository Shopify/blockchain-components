import styled from '../../styles/styled';

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
  color: ${({theme}) => theme.other.iconColor};
  cursor: pointer;

  &:hover {
    color: ${({theme}) => theme.other.iconColor};
  }

  &:focus {
    color: ${({theme}) => theme.other.iconColor};
  }
`;
