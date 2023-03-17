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
      className="sbc-rounded-tokengate sbc-bg-tokengate sbc-p-tokengate sbc-text-left sbc-shadow-tokengate sbc-border-tokengate"
      id="shopify-tokengate-card-container"
    >
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
      <Text
        as="span"
        className="sbc-mt-1 sbc-block"
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
