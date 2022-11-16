import styled from 'styled-components';

export const Button = styled.button`
  outline: unset;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 8px;
  padding: 12px 20px;
  background-color: white;
  border: solid 1px #babfc3;
  border-radius: 4px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
`;

export const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;

export const Label = styled.label`
  font-family: 'SF Pro Text', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #202223;
`;
