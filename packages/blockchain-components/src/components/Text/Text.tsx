import {Wrapper} from './style';
import {TextProps} from './types';

export const Text = ({
  as,
  bold,
  children,
  color = 'primary',
  variant = 'bodyMd',
}: TextProps) => {
  return (
    <Wrapper as={as} color={color} variant={variant} $bold={bold}>
      {children}
    </Wrapper>
  );
};
