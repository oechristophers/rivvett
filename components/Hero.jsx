import styled from "styled-components";
import Wrapper from "./Wrapper";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useEffect, useState } from "react";

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

export default function Hero() {
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isHome, setIsHome] = useState("");

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const path = window.location.pathname.split("/")[1];
      // Set initial screen size
      setIsBigScreen(window.innerWidth >= 768);

      const handleResize = () => {
        setIsBigScreen(window.innerWidth >= 768);
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
        {isHome === "women" && isBigScreen ? (
          <img src="/images/newgirl.png" alt="hero" />
        ) : (
          isHome === "women" && <img src="/images/newgirlMobile.png" alt="hero" />
        )}

        {isHome === "men" && isBigScreen ? (
          <img src="/images/newboy.png" alt="hero" />
        ) : (
          isHome === "men" && <img src="/images/newboyMobile.png" alt="hero" />
        )}

        {isHome === "" && isBigScreen ? (
          <img src="/images/denimCollage.webp" alt="hero" />
        ) : (
          isHome === "" && <img src="/images/denimCollage2.webp" alt="hero" />
        )}

        {isHome === "" && (
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
