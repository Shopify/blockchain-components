import styled from 'styled-components';

export const TokenBaseStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 45px;
  padding: 12px 0;
`;

export const TokenBaseIcon = styled.div<{round: boolean}>`
  height: 48px;
  width: 48px;
  margin-right: 12px;
  border-radius: ${(props) => (props.round ? '50%' : '4px')};
  overflow: hidden;
  position: relative;
`;

export const TokenBaseBadge = styled.div`
  position: absolute;
  right: 1px;
  bottom: 1px;
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
