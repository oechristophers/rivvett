import { useEffect, useState } from 'react';
import Image from 'next/image';
import ButtonLink from './ButtonLink';
import Link from 'next/link';

export default function Hero() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHome, setIsHome] = useState(null); // Start as null to avoid premature rendering
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setIsSmallScreen(window.innerWidth <= 768);
    setIsHome(path === 'men' || path === 'women' ? path : 'home'); // Set respective or fallback to "home"

    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
    <div className="md:px-6 py-0">
      <div className="relative w-full">
        {/* Show loader while determining the hero */}
        {isHome === null && (
          <div className="w-full h-[500px] bg-gray-200 animate-pulse" />
        )}

        {/* Display the correct image when isHome is resolved */}
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

        {/* Conditional Buttons */}
        {isLoaded && isHome === 'home' && (
          <div className="absolute bottom-0 z-10 mb-[16%] md:mb-[13%] flex flex-col items-center gap-5 mt-[42%] left-0 right-0 md:flex-row md:justify-center md:gap-8 md:mt-[45%] sm:mt-[99%]">
            <Link
              href="/women"
              className="bg-white text-black w-fit font-extralight uppercase py-2 px-4 "
              style={{fontFamily:'Futura Std Heavy',letterSpacing:'1.2px'}}
            >
              Shop Women
            </Link>
            <Link
              href="/men"
              className="bg-white text-black w-fit font-extralight uppercase py-2 px-4 "
              style={{fontFamily:'Futura Std Heavy',letterSpacing:'1.2px'}}
            >
              &nbsp; Shop Men &nbsp;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
