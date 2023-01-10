import {ButtonWrapper} from 'shared/src/components/Button/style';
import styled from 'styled-components';

// Hardcoded since none of the Dawn colors match the font color specified in the Figma
export const SoldOutButtonStyle = styled(ButtonWrapper)`
  background-color: ${({theme}) => theme.soldOutButton.background};
  border: ${({theme}) => theme.soldOutButton.border};
  border-color: #888888;
  color: #888888;
`;

export const Wrapper = styled.div`
  width: 100%;

  p {
    text-align: center;
    cursor: default;
    margin: 4px 0;
  }
`;
