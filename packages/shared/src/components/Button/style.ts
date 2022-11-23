import styled, {css} from 'styled-components';

const DefaultButtonStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 45px;
  padding: 8px 30px;
`;

export const ButtonStyle = styled.button`
  ${DefaultButtonStyle};
`;

export const ButtonText = styled.p`
  font-family: 'Assistant', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const LinkButton = styled.a`
  ${DefaultButtonStyle};
`;
