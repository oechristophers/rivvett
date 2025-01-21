import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { UseIsDevice } from './DeviceView';
import ButtonLink from './ButtonLink';
import ArrowL from './icons/ArrowL';
import ArrowR from './icons/ArrowR';
import BlogCard from './BlogCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SkeletonLoader } from './ImageSkeleton';

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Futura Std bold';
  letter-spacing: 1.3px;
  font-size: 1rem;
  margin-bottom: 0;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std heavy';
    font-weight: 900;
  }
`;
const Wrap = styled.div`
  padding: 20px 20px;
  padding-bottom: 30px;
  background: ${({ isPage }) =>
    isPage ? 'linear-gradient(90deg, #FF385C 0%, #F799BA 100%);' : ''};
`;
const CarouselWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;
  @media screen and (min-width: 768px) {
    padding: 20px 60px;
  }
  .carousel-container {
    position: unset;
  }

  .carousel-item {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two items per row */
  }

  /* Responsive design for small screens */
  @media (max-width: 768px) {
    .carousel-item {
      height: auto;
      grid-template-columns: 1fr; /* One item per row */
      grid-template-rows: 1fr 1fr;
      gap: 2px; /* Two rows */
    }
  }
  .react-multi-carousel-dot-list {
    display: flex;
    position: absolute;
    bottom: -10px;
  }

  .custom-arrow {
    position: absolute;
    top: 50%;
  }

  .custom-arrow.left {
    background-color: transparent;
    border: none;
    left: -1px;
    transform: translateX(20%);
    font-size: 20px;
    color: black; /* Set the color of the arrow */
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  .custom-arrow.right {
    background-color: transparent;
    border: none;
    right: 7px;
    transform: translateX(-15%);
    font-size: 20px;
    color: black;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

// Custom Left Arrow Component

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
  padding-top: 10px;
`;
const P = styled.p`
  text-align: center;
  margin-top: 0;
  padding-bottom: 15px;
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std book';
  }
`;
const Button = styled(ButtonLink)`
  font-family: 'Futura Std bold';
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 14px 40px;
  text-transform: uppercase;
  color: black;
  border: 1px solid black;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 1.8px;
    padding: 10px 35px;
  }
`;
const CustomLeftArrow = ({ onClick }) => (
  <button onClick={onClick} className="custom-arrow left">
    <ArrowL />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button onClick={onClick} className="custom-arrow right">
    <ArrowR />
  </button>
);
const Sect = styled.div`
  height: auto;
  padding: 0 1px;

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%;
  }
`;
const GalleryDisplay = ({ gallery, isPage }) => {
  const { isMobile, isTablet, isDesktop, isMidMobile, isHighMobile } =
    UseIsDevice();
  const rout = useRouter();
  const path = rout.pathname.split('/')[1];
  const [isLoaded, setIsLoaded] = useState(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };
  const groupedImages = [];
  for (let i = 0; i < gallery[0].images.length; i += 2) {
    groupedImages.push(gallery[0].images.slice(i, i + 2));
  }
  return (
    <Wrap isPage={isPage}>
      {!isLoaded && <SkeletonLoader />}

      <CarouselWrapper>
        {isMidMobile ? (
          <>
            <Title>ASOS LOOKS GOOD ON YOU</Title>
            <P>Tag @asos to get featured</P>
          </>
        ) : (
          <>
            <Title>AS SEEN ON ME</Title>
            <P>
              Style inspiration served by you. Share and find RIVVETT fits using
              #AsSeenOnMe
            </P>
          </>
        )}

        <Carousel
          responsive={responsive}
          showDots={!isHighMobile}
          infinite={true}
          renderDotsOutside={true}
          renderArrowsWhenDisabled={true}
          autoPlay={isTablet || isDesktop}
          removeArrowOnDeviceType={['mobile']}
          className="carousel-container"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {isHighMobile &&
            groupedImages.map((imageGroup, index) => (
              <Sect key={index} className="carousel-item">
                {imageGroup.map((image, idx) => (
                  <Image
                    onLoadingComplete={() => setIsLoaded(true)}
                    width={700}
                    height={700}
                    layout="responsive"
                    key={idx}
                    src={image}
                    alt={gallery[0].title}
                  />
                ))}
              </Sect>
            ))}
          {!isHighMobile &&
            gallery &&
            gallery[0].images.map((image, idx) => (
              <Sect key={idx}>
                <Image
                  onLoadingComplete={() => setIsLoaded(true)}
                  width={700}
                  height={700}
                  layout="responsive"
                  src={image}
                  alt={gallery[0].title}
                />
              </Sect>
            ))}
        </Carousel>
      </CarouselWrapper>
      <Div>
        <Button href={`/${path}/gallery`}>VIEW GALLERY</Button>
      </Div>
    </Wrap>
  );
};

export default GalleryDisplay;

// import React from "react";
// import styled from "styled-components";

// const Grid = styled.div`
//   display: grid;
//   position: relative;
//   margin: 0 60px;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   gap: 10px;
//   padding: 25px;

// `;
// const Div = styled.div`
//   height: 320px;
// img {
//     width: 100%;
//     height: auto;
//     max-height: 100%;
//     min-height: 320px;
//   }
// `
// export default function GalleryDisplay({ gallery }) {
//   console.log(gallery[0].title);
//   return (
//     <div>
//       <h1>Gallery</h1>
//       {/* <Grid>
// {gallery &&
//   gallery[0].images.map((image) => (
//     <Div>
//       <img src={image} alt={gallery[0].title} />
//     </Div>
//   ))}
//       </Grid> */}
//     </div>
//   );
// }
