import styled from 'styled-components';

const StyledCard = styled.div`
  border: 0.1rem solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  line-height: 24px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 4px 0;
`;

interface CardProps {
  title: string;
  subtitle: string;
  button: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => (
  <StyledCard>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    {children}
    {button}
  </StyledCard>
);

export {Card};
