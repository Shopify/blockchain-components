import styled from 'styled-components';

export const SkeletonDisplayText = styled.div`
  // Overwrite global :empty CSS rule
  display: block !important;
  background-color: #e4e5e7;
  width: 7.5rem;
  height: 20px;
  border-radius: 4px;
`;
