'use-client';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const NextImage = ({ alt = 'default alt', src, ...rest }: ImageProps) => {
  const [url, setUrl] = useState(src);
  let { width, height } = rest;

  if (!width) {
    width = 100;
  }

  if (!height) {
    height = 10;
  }

  useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={url}
      width={width}
      height={height}
      {...rest}
      onError={() => setUrl('/favicon.ico')}
    />
  );
};

export default NextImage;
