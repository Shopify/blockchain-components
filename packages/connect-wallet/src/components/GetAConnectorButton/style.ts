import {styled} from 'shared';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;

  &:not(:last-of-type) {
    border-bottom: ${({theme}) => `solid 1px ${theme.other.dividerColor}`};
  }
`;

export const ConnectorData = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  column-gap: 12px;
`;
