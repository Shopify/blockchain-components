import styled, {css} from 'styled-components';

export const SharedStyles = styled.div`
  div:empty {
    display: block;
  }
`;

export const NonEmptyElement = css`
  &:empty {
    display: block;
  }
`;
