import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { UseIsDevice } from "./DeviceView";
import ButtonLink from "./ButtonLink";
import ArrowL from "./icons/ArrowL";
import ArrowR from "./icons/ArrowR";
import BlogCard from "./BlogCard";
import { useRouter } from "next/router";

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: "Futura Std bold";
  letter-spacing: 1.3px;
  font-size: 1rem;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    text-align: left;
    padding-bottom: 25px;
  }
`;
const Wrap = styled.div`
  background: #9cf0e0;
  padding: 5px 20px;
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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Button = styled(ButtonLink)`
  font-family: "Futura Std bold";
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
const StyleFeed = ({ blogs }) => {
  const { isMobile, isTablet, isDesktop } = UseIsDevice();
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
      items: 1,
      slidesToSlide: 1,
    },
  };
  
  const router = useRouter();
  const path = router.pathname.split("/")[1];
  return (
    <Wrap>
      <CarouselWrapper>
        <Title>Style Feed</Title>
        <P>
          {path === "men"
            ? "Style. Grooming. Inspiration. Advice."
            : "Outfit ideas, editor picks, styling inspiration and Face + Body tips"}
        </P>
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          renderDotsOutside={true}
          renderArrowsWhenDisabled={true}
          autoPlay={isTablet || isDesktop}
          removeArrowOnDeviceType={["mobile"]}
          className="carousel-container"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          
            {blogs &&
              blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
        
        </Carousel>
      </CarouselWrapper>
      <Div>
        <Button href={`/${path}/style-feed`}>VIEW STYLE AND NEWS</Button>
      </Div>
    </Wrap>
  );
};

export default StyleFeed;
