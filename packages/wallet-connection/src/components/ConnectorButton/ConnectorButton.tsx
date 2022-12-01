import {Button, ConnectorName} from './style';
import {ConnectorIcon} from '../ConnectorIcon/ConnectorIcon';

interface ConnectorButtonProps {
  id: string;
  name: string;
  onClick: () => void;
}

export const ConnectorButton = ({id, name, onClick}: ConnectorButtonProps) => {
  return (
    <Button aria-label={`Connect with ${name}`} onClick={onClick}>
      <ConnectorIcon id={id} />
      <ConnectorName>{name}</ConnectorName>
    </Button>
  );
};

export default ConnectorButton;
