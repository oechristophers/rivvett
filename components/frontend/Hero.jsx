import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  padding: 0;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Loader = styled.div`
  width: 100%;
  height: 500px;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100; /* Ensure it's on top */

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const ImageStyled = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: auto;
  display: ${props => (props.loaded ? 'block' : 'none')};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 500px; /* Same as Loader */
  background: #e0e0e0;
  display: ${props => (props.loaded ? 'none' : 'block')};
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 10;
  margin-bottom: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 42%;
  left: 0;
  right: 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 32px;
    margin-top: 45%;
  }

  @media (max-width: 768px) {
    margin-top: 99%;
  }
`;

const ShopLink = styled(Link)`
  background-color: white;
  color: black;
  font-weight: 200;
  text-transform: uppercase;
  padding: 10px 16px;
  font-family: 'Futura Std Heavy', sans-serif;
  letter-spacing: 1.2px;
  display: inline-block;
`;

export default function Hero() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHome, setIsHome] = useState(null); // Start as null to avoid premature rendering
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.split('/')[1];
      
      // Delay setting isHome for smoother loader experience
      setTimeout(() => {
        setIsHome(path === 'men' || path === 'women' ? path : 'home');
      }, 300);

      setIsSmallScreen(window.innerWidth <= 768);
      const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getImageSrc = () => {
    if (isHome === 'women') {
      return isSmallScreen
        ? '/images/newgirlMobile.png'
        : '/images/newgirl.png';
    }
    if (isHome === 'men') {
      return isSmallScreen ? '/images/newboyMobile.png' : '/images/newboy.png';
    }
    return isSmallScreen
      ? '/images/denimCollage2.webp'
      : '/images/denimCollage.webp';
  };

  return (
    <HeroWrapper>
      <HeroContainer>
        {/* Show loader while determining the hero */}
        {isHome === null && <Loader></Loader>}

        {/* Display placeholder until image is loaded */}
        {isHome !== null && !isLoaded && <Placeholder loaded={isLoaded} />}

        {/* Display the correct image when isHome is resolved */}
        {isHome !== null && (
          <ImageStyled
            src={getImageSrc()}
            alt="hero"
            width={2800}
            height={1400}
            layout="responsive"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            onLoadingComplete={() => setIsLoaded(true)}
            loaded={isLoaded.toString()}
          />
        )}

        {/* Conditional Buttons */}
        {isLoaded && isHome === 'home' && (
          <ButtonContainer>
            <ShopLink href="/women">Shop Women</ShopLink>
            <ShopLink href="/men">&nbsp; Shop Men &nbsp;</ShopLink>
          </ButtonContainer>
        )}
      </HeroContainer>
    </HeroWrapper>
  );
}
