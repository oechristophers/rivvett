import { useState, useEffect } from 'react';
export const UseIsDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMidMobile, setIsMidMobile] = useState(false);
  const [isHighMobile, setIsHighMobile] = useState(false);
  const [higherMobile, setHigherMobile] = useState(false);
  const [isSmallTab, setIsSmallTab] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isNavView, setIsNavView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 464);
      setIsMidMobile(width <= 600);
      setIsHighMobile(width <= 767);
      setHigherMobile(width <= 800);
      setIsSmallTab(width > 768 && width <= 920);
      setIsTablet(width > 768 && width <= 1024);
      setIsNavView(width > 950);
      setIsDesktop(width > 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isMidMobile,
    isHighMobile,
    isTablet,
    isDesktop,
    isSmallTab,
    higherMobile,
    setIsNavView,
    isNavView,
  };
};
