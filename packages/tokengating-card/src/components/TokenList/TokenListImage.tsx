import {TokenListImageStyle} from './style';

const TokenListImage = ({alt, imageUrl}: {alt: string; imageUrl: string}) => (
  <TokenListImageStyle src={imageUrl} alt={alt} />
);
export {TokenListImage};
