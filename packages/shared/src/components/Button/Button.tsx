import {ButtonStyle, ButtonText} from './style';

export interface ButtonProps {
  /**
   * What is the Id of the button?
   */
  id?: string;
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
  id,
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyle
      id={id}
      type="button"
      className="button button--full-width"
      {...props}
    >
      <ButtonText>
        {label}
      </ButtonText>
    </ButtonStyle>
  );
};
