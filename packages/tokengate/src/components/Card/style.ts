import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: ${({theme}) => theme.tokengate.background};
  border: ${({theme}) => theme.tokengate.border};
  border-radius: ${({theme}) => theme.tokengate.borderRadius};
  box-shadow: ${({theme}) => theme.tokengate.boxShadow};
  padding: ${({theme}) => theme.tokengate.padding};
`;
