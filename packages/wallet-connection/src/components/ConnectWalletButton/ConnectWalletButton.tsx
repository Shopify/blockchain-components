
export interface ConnectWalletButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const ConnectWalletButton = ({
  label,
  ...props
}: ConnectWalletButtonProps) => {
  return (
    <button
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};

export default ConnectWalletButton
