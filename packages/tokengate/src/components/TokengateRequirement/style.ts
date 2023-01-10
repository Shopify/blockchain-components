import styled from 'styled-components';

export const TokengateRequirementSeparatorStyle = styled.div<{$gap: string}>`
  display: flex;
  align-items: center;
  column-gap: ${({$gap}) => $gap};
  padding: 4px 0;

  &:before,
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #e1e3e5;
  }
`;

export const TokengateRequirementBadgeWrapper = styled.div`
  color: white;
  line-height: 0;
`;
