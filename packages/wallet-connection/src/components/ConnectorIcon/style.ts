import styled from 'styled-components';

export const ConnectorIconWrapper = styled.div<{size: string}>`
  width: ${($props) => $props.size};
  height: ${($props) => $props.size};
`;
