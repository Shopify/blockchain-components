import {Text} from '@shopify/blockchain-components';

import {StyledCard, SubtitleWrapper} from './style';

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
      <SubtitleWrapper>
        <Text as="span" variant="bodyMd" color="secondary">
          {subtitle}
        </Text>
      </SubtitleWrapper>
      {children}
      {button}
    </StyledCard>
  );
};

export {Card};
