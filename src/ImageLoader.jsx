import React, { useEffect, useState } from 'react';

function ImageLoader({ src, alt, hidden, onLoad }) {

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      onLoad()
    };

    return () => {
      // Clean up the image object if the component is unmounted
      image.onload = null;
    };
  }, [src]);

  // if (!loaded) {
  //   return null; // Render nothing while the image is loading
  // }

  return (
    <img src={src} alt={alt} hidden={hidden} />
  );
}
export default ImageLoader
