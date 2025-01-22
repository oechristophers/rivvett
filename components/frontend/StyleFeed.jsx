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
import css from 'styled-jsx/css';
import Link from 'next/link';

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Futura Std bold';
  letter-spacing: 1.3px;
  font-size: 1rem;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    text-align: left;
    padding-bottom: 25px;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std heavy';
    font-weight: 900;
  }
`;
const Wrap = styled.div`
  background: ${({ inId }) => (inId ? 'white' : '#9cf0e0')};
  padding: ${({ inId }) => (inId ? ' 5px 0' : '20px 60px')};
  @media screen and (max-width: 768px) {
    padding: ${({ inId }) => (inId ? ' 5px 0' : '20px 10px')};
  }
`;
const CarouselWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;
  @media screen and (min-width: 768px) {
    padding: ${({ inId }) => (inId ? ' 20px 0' : '5px 20px')};
  }
  @media screen and (max-width: 768px) {
    .custom-arrow.left,
    .custom-arrow.right {
      display: none;
    }
  }

  .carousel-container {
    position: unset;
  }

  .react-multi-carousel-dot-list {
    display: flex;
    position: absolute;
    bottom: -25px;
  }

  .custom-arrow {
    position: absolute;
    top: 50%;
  }

  .custom-arrow.left {
    background-color: transparent;
    border: none;
    left: -32px;
    transform: translateX(20%);
    font-size: 20px;
    color: black; /* Set the color of the arrow */
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  .custom-arrow.left2 {
    right: 90px;
    top: 0;
    margin-top: 20px;
    color: black;
    transition: transform 0.3s ease;
    border: 1px solid #00000045;
    background-color: white;

    &:hover {
      transform: scale(1.1);
    }
  }
  .custom-arrow.right2 {
    right: 20px;
    top: 0;
    margin-top: 20px;
    color: black;
    transition: transform 0.3s ease;
    border: 1px solid #00000045;
    background-color: white;

    &:hover {
      transform: scale(1.1);
    }
  }
  .custom-arrow.right {
    background-color: transparent;
    border: none;
    right: -32px;
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
  margin-top: 30px;
  padding-bottom: 20px;
  padding-top: 10px;
  ${(props) =>
    props.btn &&
    `
      margin-top: 53%;
    `}
`;
const P = styled.p`
  text-align: center;
  margin-top: 0;
  padding-bottom: 15px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const RoundBtn = styled.button`
  width: 100px;
  cursor: pointer;
  height: 100px;
  background-color: white;
  border-color: transparent;
  font-family: 'Futura Std Heavy';
  letter-spacing: 1.2px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: black;
    color: white;
  }
`;
export const Button = styled(ButtonLink)`
  font-family: 'Futura Std bold';
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 14px 40px;
  text-transform: uppercase;
  color: black;
  background: linear-gradient(to bottom left, white 50%, black 50%);
  background-size: 200% 200%;
  background-position: top right;
  transition: background-position 0.3s ease;

  &:hover {
    background-position: bottom left;
    color: white;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const CustomLeftArrow = ({ onClick, check }) => (
  <button
    onClick={onClick}
    className={check ? 'custom-arrow left2' : 'custom-arrow left'}
  >
    <ArrowL />
  </button>
);

const CustomRightArrow = ({ onClick, check }) => (
  <button
    onClick={onClick}
    className={check ? 'custom-arrow right2' : 'custom-arrow right'}
  >
    <ArrowR />
  </button>
);
const StyleFeed = ({ blogs, inId, isId }) => {
  const { isMobile, isTablet, isDesktop, isHighMobile, isNavView } =
    UseIsDevice();
  const relatedBlogs = blogs.filter((blog) => blog.id !== isId).splice(0, 4);
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
      partialVisibilityGutter: inId ? 60 : 0,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: inId ? 2 : 1,
      slidesToSlide: 1,
      partialVisibilityGutter: inId ? 30 : 0,
    },
  };

  const router = useRouter();
  const path = router.pathname.split('/')[1];
  return (
    <Wrap inId={inId}>
      <CarouselWrapper inId={inId}>
        <Title>Style Feed</Title>
        {!inId && (
          <P>
            {path === 'men'
              ? 'Style. Grooming. Inspiration. Advice.'
              : 'Outfit ideas, editor picks, styling inspiration and Face + Body tips'}
          </P>
        )}

        <Carousel
          responsive={responsive}
          showDots={!inId && !isHighMobile}
          infinite={!inId && !isHighMobile}
          renderDotsOutside={true}
          partialVisible={true}
          renderArrowsWhenDisabled={true}
          autoPlay={(isTablet || isDesktop) && !inId}
          removeArrowOnDeviceType={!inId && ['mobile']}
          className="carousel-container"
          customLeftArrow={<CustomLeftArrow check={inId} />}
          customRightArrow={<CustomRightArrow check={inId} />}
        >
          {!inId &&
            blogs &&
            blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
          {inId &&
            relatedBlogs &&
            relatedBlogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} inId={inId} />
            ))}
          {isHighMobile && !inId && (
            <Div btn>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  zIndex: '6',
                }}
                href={`/${path}/style-feed`}
              >
                <RoundBtn>VIEW ALL</RoundBtn>
              </Link>
            </Div>
          )}
          {!isNavView && inId && (
            <Div btn>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  zIndex: '6',
                }}
                href={`/${path}/style-feed`}
              >
                <RoundBtn>VIEW ALL</RoundBtn>
              </Link>
            </Div>
          )}
        </Carousel>
      </CarouselWrapper>
      {!inId && (
        <Div>
          <Button href={`/${path}/style-feed`}>VIEW STYLE AND NEWS</Button>
        </Div>
      )}
    </Wrap>
  );
};

export default StyleFeed;
