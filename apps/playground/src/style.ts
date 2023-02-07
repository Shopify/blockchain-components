import styled from 'styled-components';

export const Preview = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    flex: 1;
    max-width: 380px;
  }
`;
