const TokenListImage = ({alt, imageUrl}: {alt: string; imageUrl?: string}) => {
  if (!imageUrl) {
    return <div className="sbc-h-full sbc-w-full sbc-bg-skeleton" />;
  }

  return (
    <img
      alt={alt}
      className="sbc-h-full sbc-w-full sbc-object-cover"
      src={imageUrl}
    />
  );
};
export {TokenListImage};
