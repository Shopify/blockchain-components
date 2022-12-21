import {StandaloneFrame, StyledCard, Subtitle, Title} from './style';

interface CardProps {
  title: string;
  subtitle: string;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => {
  const isDev = import.meta.env.DEV;

  const _CardComponent = (
    <StyledCard>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {children}
      {button}
    </StyledCard>
  );

  if (isDev) {
    return <StandaloneFrame>{_CardComponent}</StandaloneFrame>;
  }

  return _CardComponent;
};

export {Card};
