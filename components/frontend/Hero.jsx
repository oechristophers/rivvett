import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';



const Div = styled.div``
export default function Hero() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHome, setIsHome] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);
    
    // Initial check
    updateScreenSize();

    // Add event listener
    mediaQuery.addEventListener('change', updateScreenSize);

    return () => mediaQuery.removeEventListener('change', updateScreenSize);
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
    <Div className="md:px-6 py-0">
      <Div className="relative w-full">
        {isHome === null && (
          <Div className="w-full h-[500px] bg-gray-200 animate-pulse" />
        )}

        {isHome && (
          <Image
            src={getImageSrc()}
            alt="hero"
            width={2800}
            height={1400}
            layout="responsive"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="object-cover w-full h-auto"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        )}

        {isLoaded && isHome === 'home' && (
          <Div className="absolute bottom-0 z-10 mb-[16%] md:mb-[13%] flex flex-col items-center gap-5 mt-[42%] left-0 right-0 md:flex-row md:justify-center md:gap-8 md:mt-[45%] sm:mt-[99%]">
            <Link
              href="/women"
              className="bg-white text-black w-fit font-extralight uppercase py-2 px-4 "
              style={{ fontFamily: 'Futura Std Heavy', letterSpacing: '1.2px' }}
            >
              Shop Women
            </Link>
            <Link
              href="/men"
              className="bg-white text-black w-fit font-extralight uppercase py-2 px-4 "
              style={{ fontFamily: 'Futura Std Heavy', letterSpacing: '1.2px' }}
            >
              &nbsp; Shop Men &nbsp;
            </Link>
          </Div>
        )}
      </Div>
    </Div>
  );
}
