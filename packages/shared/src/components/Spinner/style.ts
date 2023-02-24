import {styled, keyframes} from 'shared';

const spinAnimation = keyframes`
    to {
        transform: rotate(1turn)
    };
`;

export const SpinnerComponent = styled.div`
  width: auto;
  margin: 0 auto;

  svg {
    animation: ${spinAnimation} 500ms linear infinite;
    height: 20px;
    width: 20px;
  }
`;
