import styled from 'styled-components';

export const StyledCard = styled.div`
  border: 0.1rem solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px;
`;

export const StandaloneFrame = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  ${StyledCard} {
    flex: 1;
    max-width: 380px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 4px 0;
`;

export const Title = styled.h2`
  font-size: 20px;
  line-height: 24px;
`;
