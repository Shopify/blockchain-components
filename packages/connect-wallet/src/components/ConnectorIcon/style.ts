import {styled} from '@shopify/blockchain-components';

import {Size} from '../../types/sizes';

export const ConnectorIconWrapper = styled.div<{size: Size}>`
  width: ${({size}) => size};
  height: ${({size}) => size};
`;
