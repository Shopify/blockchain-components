import {StyledCard, Subtitle, Title} from './style';

interface CardProps {
  title: string;
  subtitle: string;
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
