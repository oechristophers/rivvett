import styled, { keyframes } from "styled-components";
import Wrapper from "./Wrapper";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useEffect, useState } from "react";
import Image from "next/image";

const HeroDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    margin-bottom: 20px;
    position: relative;
  }
`;
const HeroButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  position: absolute;
  top: 0;
  margin-top: 42%;
  left: 0;
  right: 0;
  z-index: 2;
  @media screen and (max-width: 1000px) {
    margin-top: 45%;
  }
  @media screen and (max-width: 768px) {
    margin-top: 39%;
  }
  @media screen and (max-width: 767px) {
    margin-top: 99%;
  }
  /*  @media screen and (max-width: 730px) {
    bottom: 0;
    top: auto;
    margin-bottom: -15%;
  }
  @media screen and (max-width: 620px) {
    bottom: 0;
    top: auto;
    margin-bottom: 5%;
  } */
`;
// const HeroButton = styled.button`

// `

const HeroWrapper = styled.div`
  padding: 25px;
  padding-top: 0;
  padding-bottom: 0;
  @media screen and (max-width: 1200px) {
    padding: 0;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export default function Hero() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHome, setIsHome] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const path = window.location.pathname.split("/")[1];
      // Set initial screen size
      setIsSmallScreen(window.innerWidth <= 768);

      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
      };

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      path === "men"
        ? setIsHome("men")
        : path === "women"
        ? setIsHome("women")
        : setIsHome("");
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <HeroWrapper>
      <HeroDiv>
        {/* Placeholder or loader logic while the image is loading */}
        {!isLoaded &&<SkeletonLoader />}

        {isHome === "women" && isSmallScreen ? (
          <Image
            width={2800}
            height={1400}
            layout="responsive"
            src="/images/newgirl.png"
            alt="hero"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        ) : (
          isHome === "women" && (
            <Image
              width={2800}
              height={1400}
              layout="responsive"
              src="/images/newgirl.png"
              alt="hero"
              onLoadingComplete={() => setIsLoaded(true)}
            />
          )
        )}

        {isHome === "men" && isSmallScreen ? (
          <Image
            width={1080}
            height={1350}
            layout="responsive"
            src="/images/newboyMobile.png"
            alt="hero"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        ) : (
          isHome === "men" && (
            <Image
              width={2800}
              height={1400}
              layout="responsive"
              src="/images/newboy.png"
              alt="hero"
              onLoadingComplete={() => setIsLoaded(true)}
            />
          )
        )}

        {isHome === "" && isSmallScreen ? (
          <Image
            width={1080}
            height={1350}
            layout="responsive"
            src="/images/denimCollage2.webp"
            alt="hero"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        ) : (
          isHome === "" && (
            <Image
              width={2800}
              height={1400}
              layout="responsive"
              src="/images/denimCollage.webp"
              alt="hero"
              onLoadingComplete={() => setIsLoaded(true)}
            />
          )
        )}

        {isLoaded && isHome === "" && (
          <HeroButtons>
            <ButtonLink hero hero1 href={"/women"}>
              Shop Women
            </ButtonLink>
            <ButtonLink hero href={"/men"}>
              &nbsp; Shop Men &nbsp;
            </ButtonLink>
          </HeroButtons>
        )}
      </HeroDiv>
    </HeroWrapper>
  );
}
