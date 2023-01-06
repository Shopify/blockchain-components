import {StyledCard, Subtitle, Title} from './style';

interface CardProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => {
  return (
    <StyledCard>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {children}
      {button}
    </StyledCard>
  );
};

export {Card};
