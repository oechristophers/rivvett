import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { UseIsDevice } from './DeviceView';
import ButtonLink from './ButtonLink';
import ArrowL from './icons/ArrowL';
import ArrowR from './icons/ArrowR';
import { useRouter } from 'next/router';

export const Title = styled.h2`
  text-align: ${({ withGap, inCart, inBlog }) =>
    withGap || inCart || inBlog ? 'left' : 'center'};
  text-transform: uppercase;
  font-family: 'Futura Std Heavy';
  letter-spacing: 2px;
  font-size: ${({ withGap, inCart }) =>
    withGap || inCart ? '1rem' : '1.3rem'};
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 2.3px;
    font-family: 'Futura Std heavy';
    font-weight: 900;
  }
  padding-bottom: ${({ inCart }) => (inCart ? '0' : '20px')};
`;
const CarouselWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;
  padding: 0 5px;
  @media screen and (min-width: 768px) {
    padding: 20px 60px;
  }
  @media screen and (max-width: 600px) {
    padding: 0;
  }
  .carousel-container {
    position: unset;
  }

  .react-multi-carousel-dot-list {
    display: flex;
    position: absolute;
    bottom: -30px;
  }
  /* .react-multi-carousel-item {
    margin-right: ${({ withGap }) => (withGap ? '20px' : '0')};
  } */

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
    right: -1px;
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

const StyledCarousel = styled(Carousel)`
  display: flex;
  gap: 20px;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
  padding-top: 10px;
`;
const Button = styled(ButtonLink)`
  background-color: black;
  margin-top: 20px;
  font-family: 'Futura Std Heavy';
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 10px 40px;
  text-transform: uppercase;
  @media screen and (max-width: 500px) {
    padding: 10px 20px;
    font-size: 0.7rem;
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
const StyledProductCard = styled.div`
  margin-right: ${({ withGap, inCart, inBlog }) =>
    withGap || inBlog
      ? '20px'
      : inCart
        ? '2px'
        : '0'}; // Add spacing between cards
  padding: ${({ inBlog }) => (inBlog ? ' 20px' : '2px')};
  padding-bottom: ${({ inBlog }) => (inBlog ? ' 40px' : '0')};
  background-color: ${({ inBlog }) => (inBlog ? 'white' : 'transparent')};

  transition: transform 0.3s ease;
  &:hover {
    transform: ${({ inBlog }) => (inBlog ? 'scale(1.02)' : 'none')};
  }
  @media screen and (max-width: 600px) {
    margin-right: 1px;
  }
`;
const ProductCarousel = ({
  products,
  genderName,
  withGap,
  hideButton,
  byShop,
  byColl,
  inCart,
  inBlog,
}) => {
  const { isMobile, isTablet, isDesktop, isHighMobile } = UseIsDevice();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: inCart ? 3 : inBlog ? 2 : 4,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: inCart ? 3 : inBlog ? 2 : 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: inBlog ? 2 : 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: inBlog ? 1 : 2,
      slidesToSlide: inBlog ? 1 : 2,
      partialVisibilityGutter: inBlog ? 160 : 12,
    },
  };

  const genderId =
    genderName === 'men'
      ? '669161b8bbede0f410af829e'
      : genderName === 'women'
        ? '669161c1bbede0f410af82a2'
        : '';
   const routTo = `/products?gender=${genderId}`; 
  return (
    <>
      <CarouselWrapper
        withGap={withGap}
        byColl={byColl}
        byShop={byShop}
        inCart={inCart}
        inBlog={inBlog}
      >
        <Title withGap={withGap} inCart={inCart} inBlog={inBlog}>
          {inBlog
            ? 'Shop the story'
            : inCart
              ? 'A little something extra?'
              : !withGap
                ? 'As seen on social'
                : byShop
                  ? 'RELATED BY SHOP'
                  : byColl
                    ? 'SIMILAR IN COLLECTION'
                    : ''}
        </Title>
        <StyledCarousel
          responsive={responsive}
          showDots={!isHighMobile}
          infinite={true}
          renderDotsOutside={true}
          partialVisible={true}
          renderArrowsWhenDisabled={true}
          autoPlay={!inBlog && !withGap && (isDesktop || isTablet)}
          removeArrowOnDeviceType={['mobile']}
          className="carousel-container"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {products &&
            products.map((product) => (
              <StyledProductCard
                withGap={withGap}
                inCart={inCart}
                inBlog={inBlog}
                key={product._id}
              >
                <ProductCard
                  {...product}
                  genderName={genderName}
                  inCart={inCart}
                />
              </StyledProductCard>
            ))}
        </StyledCarousel>
      </CarouselWrapper>
      {!hideButton && (
        <Div>
          <Button href={routTo}>Shop now</Button>
        </Div>
      )}
    </>
  );
};

export default ProductCarousel;
