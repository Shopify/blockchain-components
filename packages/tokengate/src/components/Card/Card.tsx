import {Text} from 'shared';

interface CardProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => {
  return (
    <div
      className="sbc-rounded-tokengate sbc-border-tokengate sbc-bg-tokengate sbc-p-tokengate sbc-text-left sbc-shadow-tokengate"
      id="shopify-tokengate-card-container"
    >
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
      <Text
        as="span"
        className="sbc-block sbc-pt-1"
        variant="bodyMd"
        color="secondary"
      >
        {subtitle}
      </Text>
      {children}
      {button}
    </div>
  );
};

export {Card};
