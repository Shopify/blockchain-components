import {useI18n} from '@shopify/react-i18n';
import {Button} from 'shared/src/components/Button';

interface ConnectWalletButtonProps {
  loading?: boolean;
  onConnectWallet?: () => void;
}

const ConnectWalletButton = ({
  onConnectWallet,
  loading,
}: ConnectWalletButtonProps) => {
  const [i18n] = useI18n();

  return (
    <Button
      id="connectWallet"
      fullWidth
      label={i18n.translate('ConnectWalletButton.buttonText')}
      loading={loading}
      onClick={onConnectWallet}
      primary
    />
  );
};
export {ConnectWalletButton};
