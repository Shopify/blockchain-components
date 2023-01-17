import styled from 'styled-components';

export const TokengateRequirementsSeparatorStyle = styled.div<{$gap: string}>`
  display: flex;
  align-items: center;
  column-gap: ${({$gap}) => $gap};
  padding: 4px 0;

  &:before,
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({theme}) => theme.other.dividerColor};
  }
`;

export const TokengateRequirementsBadgeWrapper = styled.div`
  color: white;
  line-height: 0;
`;
