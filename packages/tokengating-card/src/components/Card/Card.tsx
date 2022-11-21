import styled from 'styled-components';

const CardWrapper = styled.div`
  background-color: red;
`;

interface CardProps {
  title: string;
  subtitle: string;
  button: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => (
  <CardWrapper>
    <h2>{title}</h2>
    <p>{subtitle}</p>
    {children}
    {button}
  </CardWrapper>
);

export {Card};
