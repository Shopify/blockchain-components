import {TokenListImageStyle, TokenListRoundedImageStyle} from './style';

const TokenListImage = ({
  alt,
  imageUrl,
  rounded,
}: {
  alt: string;
  imageUrl: string;
  rounded: boolean;
}) =>
  rounded ? (
    <TokenListRoundedImageStyle src={imageUrl} alt={alt} />
  ) : (
    <TokenListImageStyle src={imageUrl} alt={alt} />
  );

export {TokenListImage};
