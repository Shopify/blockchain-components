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
      <div className="sbc-pt-1">
        <Text as="span" variant="bodyMd" color="secondary">
          {subtitle}
        </Text>
      </div>
      {children}
      {button}
    </div>
  );
};

export {Card};
