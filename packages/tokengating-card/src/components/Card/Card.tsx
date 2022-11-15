interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => <div>{children}</div>;

export { Card };
