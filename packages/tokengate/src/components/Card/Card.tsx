import {Text} from 'shared';

import {StyledCard} from './style';

interface CardProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => {
  return (
    <StyledCard id="shopify-tokengate-card-container">
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
      <Text as="p" variant="bodyMd">
        {subtitle}
      </Text>
      {children}
      {button}
    </StyledCard>
  );
};

export {Card};
