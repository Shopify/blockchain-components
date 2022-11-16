import {Button, IconContainer, Label} from './style';
import {MetaMask, WalletConnect} from '../../assets/connectors';

interface ConnectorButtonProps {
  name: string;
  onClick: () => void;
}

const ConnectorIconData: {[key: string]: JSX.Element} = {
  MetaMask: MetaMask,
  WalletConnect: WalletConnect,
};

export const ConnectorButton = ({name, onClick}: ConnectorButtonProps) => {
  const icon = ConnectorIconData[name] || null;

  return (
    <Button aria-label={`Connect with ${name}`} onClick={onClick}>
      <IconContainer>{icon}</IconContainer>
      <Label>{name}</Label>
    </Button>
  );
};

export default ConnectorButton;
