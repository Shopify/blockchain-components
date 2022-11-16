import {Button, ConnectorIcon, ConnectorName} from './style';
import {ConnectorIconData} from '../../constants/connectors';

interface ConnectorButtonProps {
  name: string;
  onClick: () => void;
}

export const ConnectorButton = ({name, onClick}: ConnectorButtonProps) => {
  const icon = ConnectorIconData[name] || null;

  return (
    <Button aria-label={`Connect with ${name}`} onClick={onClick}>
      <ConnectorIcon>{icon}</ConnectorIcon>
      <ConnectorName>{name}</ConnectorName>
    </Button>
  );
};

export default ConnectorButton;
