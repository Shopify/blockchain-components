import {Button, ConnectorName} from './style';
import {ConnectorIcon} from '../ConnectorIcon/ConnectorIcon';

interface ConnectorButtonProps {
  name: string;
  onClick: () => void;
}

export const ConnectorButton = ({name, onClick}: ConnectorButtonProps) => {
  return (
    <Button aria-label={`Connect with ${name}`} onClick={onClick}>
      <ConnectorIcon connectorName={name} />
      <ConnectorName>{name}</ConnectorName>
    </Button>
  );
};

export default ConnectorButton;
