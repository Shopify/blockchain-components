interface CardProps {
  title: string;
  subtitle: string;
  button: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({title, subtitle, button, children}: CardProps) => (
  <div>
    <h2>{title}</h2>
    <p>{subtitle}</p>
    {children}
    {button}
  </div>
);

export {Card};
