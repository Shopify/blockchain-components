import {styled} from '@shopify/blockchain-components';

export const TokengateRequirementsSeparatorStyle = styled.div<{$gap: string}>`
  display: flex;
  align-items: center;
  column-gap: ${({$gap}) => $gap};
  margin: calc(${({theme}) => theme.typography.bodySm.fontSize} / -2) 0;

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
