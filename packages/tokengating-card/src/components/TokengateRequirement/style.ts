import styled from 'styled-components';

export const TokengateRequirementSeparatorStyle = styled.div`
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:before,
  &:after {
    content: '';
    width: calc(50% - 16px);
    height: 1px;
    background-color: #e1e3e5;
  }
`;

export const TokengateRequirementBadgeWrapper = styled.div`
  color: white;
  line-height: 0;
`;
