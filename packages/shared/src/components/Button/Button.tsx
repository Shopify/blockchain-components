import {ButtonStyle, ButtonText} from './style';

export interface ButtonProps {
  id?: string;
  className?: HTMLDivElement['className'];
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

export const Button = ({id, label, primary = false, ...props}: ButtonProps) => {
  return (
    <ButtonStyle id={id} type="button" {...props}>
      <ButtonText>{label}</ButtonText>
    </ButtonStyle>
  );
};
