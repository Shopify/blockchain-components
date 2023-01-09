import {ErrorTextStyle} from './style';

const Error = ({text}: {text?: string}) => (
  <ErrorTextStyle>{text}</ErrorTextStyle>
);

export {Error};
