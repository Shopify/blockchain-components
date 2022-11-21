import './button.css';
import {ButtonStyle, ButtonText} from './style';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
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
export const Button = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <ButtonStyle
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' ',
      )}
      {...props}
    >
      <ButtonText>
        {label}
      </ButtonText>
    </ButtonStyle>
  );
};
