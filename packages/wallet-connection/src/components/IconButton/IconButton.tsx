import {ComponentPropsWithoutRef, ReactNode} from 'react';

import {StyledButton} from './style';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: ReactNode;
}

const IconButton = ({icon, ...rest}: IconButtonProps) => {
  return (
    <StyledButton {...rest} type="button">
      {icon}
    </StyledButton>
  );
};

export default IconButton;
