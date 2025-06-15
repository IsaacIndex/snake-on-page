import { useEffect } from 'react'
import PropTypes from 'prop-types'

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
  }, [onLoad, src])

  // if (!loaded) {
  //   return null; // Render nothing while the image is loading
  // }

  return (
    <img src={src} alt={alt} hidden={hidden} />
  );
}

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
}

ImageLoader.defaultProps = {
  hidden: false,
}

export default ImageLoader
