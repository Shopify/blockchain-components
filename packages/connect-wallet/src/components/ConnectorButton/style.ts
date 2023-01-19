import styled from 'styled-components';
import {ButtonWrapper} from 'shared';

export const Button = styled(ButtonWrapper)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-bottom: 12px;
  padding: 12px;
  justify-content: flex-start;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
