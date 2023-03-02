import {styled} from 'shared';

export const Wrapper = styled.div`
  display: flex;
  grid-gap: 24px;

  @media (max-width: 700px) {
    flex-direction: column;
    grid-gap: 12px;
  }
`;

export const TokengateWrapper = styled.div`
  min-width: 400px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
`;
