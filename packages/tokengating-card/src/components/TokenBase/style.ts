import styled from 'styled-components';

export const TokenBaseStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 45px;
  padding-top: 20px;
  padding-bottom: 24px;
`;

export const TokenBaseIcon = styled.div`
  height: 48px;
  width: 48px;
  background-color: blue;
  margin-right: 12px;
  border-radius: 4px;
`;

export const TokenBaseText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Assistant', sans-serif;
  font-style: normal;
  font-weight: 400;
`;


export const TokenBaseTitle = styled.p`
  font-size: 16px;
  margin: 0px;
  line-height: 21px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.tokenBase.textColor};
`;

export const TokenBaseSubtitle = styled.p`
  font-size: 13px;
  margin: 0px;
  line-height: 20px;
  letter-spacing: 0.4px;
`;