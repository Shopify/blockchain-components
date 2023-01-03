import styled from 'styled-components';

import {Size} from '../../types/sizes';

export const ConnectorIconWrapper = styled.div<{size: Size}>`
  width: ${({size}) => size};
  height: ${({size}) => size};
`;
