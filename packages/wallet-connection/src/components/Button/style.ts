import styled from 'styled-components';

export const ButtonStyle = styled.button`
  background-color: ${({theme}) => theme.connectButton.background};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 166px;
  height: 45px;
  padding: 8px 30px;
  border: none;
`;

export const ButtonText = styled.p`
  font-family: 'Assistant', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.connectButton.textColor};
`;
