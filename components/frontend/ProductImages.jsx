import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.3s ease;
  ${(props) =>
    props.active
      ? `
    border: 2px solid #ccc;
  `
      : ` 
    border: none;
    opacity: 0.85;
  `};
  ${(props) =>
    props.loading &&
    css`
      opacity: 0;
    `}
`;

const BigImage = styled.img`
  max-height: 610px;
  max-width: 450px;
  transition: opacity 0.3s ease;
  ${(props) =>
    props.loading &&
    css`
      opacity: 0;
    `}
  @media screen and (max-width: 900px) {
    max-height: 610px;
    max-width: 100%;
  }
  @media screen and (max-width: 780px) {
    max-height: 100%;
    max-width: 100%;
  }
`;

const Skeleton = styled.div`
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const SkeletonImage = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 780px) {
    flex-direction: column-reverse;
  }
`;

const ImageButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  @media screen and (max-width: 780px) {
    flex-direction: row;
  }
  margin-top: 10px;
`;

const ImageButton = styled.div`
  width: 47px;
  height: 60px;
  position: relative;
  cursor: pointer;
`;

const BigImageWrapper = styled.div`
  width: 450px;
  height: 610px;
  position: relative;
 
  @media screen and (max-width: 780px) {
    width: 100%;
    height: auto;
  }
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    setActiveImage(images?.[0]); // Set first image as active when component mounts.
  }, [images]);

  const handleImageLoad = (image) => {
    setLoadedImages((prev) => ({ ...prev, [image]: true }));
  };

  return (
    <Div>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton key={image} onClick={() => setActiveImage(image)}>
            {!loadedImages[image] && <SkeletonImage />}
            <Image
              active={image === activeImage}
              src={image}
              alt="Product Image"
              loading={!loadedImages[image]}
              onLoad={() => handleImageLoad(image)}
            />
          </ImageButton>
        ))}
      </ImageButtons>

      <BigImageWrapper>
        {!loadedImages[activeImage] && <SkeletonImage />}
        <BigImage
          src={activeImage}
          alt="Active Product Image"
          loading={!loadedImages[activeImage]}
          onLoad={() => handleImageLoad(activeImage)}
        />
      </BigImageWrapper>
    </Div>
  );
}
