import styled from 'styled-components';

export const TokenListImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TokenListRoundedImageStyle = styled(TokenListImageStyle)`
  border-radius: 4px;
`

export const TokenListWrapper = styled.div`
  padding: 4px 0;
  box-sizing: unset;
`;
