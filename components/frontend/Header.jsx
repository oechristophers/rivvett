import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { CartContext } from './CartContext';
import Wrapper from './Wrapper';
import CatNav from './CategoryNavigate';
import { UseIsDevice } from './DeviceView';
import { useRouter } from 'next/router';
import { MenuSharp } from '@mui/icons-material';
import CartPreview from './CartPreview';
import AccountNav from './AccountNav';
import PreHeader from './header/PreHeader';
import { MobNav, NavForPc, NavIcons } from './header/StyledNav';
import HeaderSkeleton from './header/Skeleton';
import SearchBar from './header/SearchBar';

const StyledHeader = styled.header`
  background-color: #222;
  padding: 0 10px;
  @media screen and (max-width: 800px) {
    margin-top: -6px;
  }
  @media screen and (min-width: 900px) {
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const HeadWrapper = styled.div`
  display: flex;
  position: relative;
  @media screen and (min-width: 768px) {
    justify-content: space-between;
    gap: 0px;
  }
`;

const Div = styled.div`
  display: flex;
  position: relative;
`;

const NavButton = styled.button`
  background: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  padding-top: 20px;
  margin-right: 10px;
  @media screen and (min-width: 950px) {
    display: none;
  }
  @media screen and (max-width: 800px) {
    margin-right: 10px;
    padding-top: 20px;
  }
  ${(props) => props.hasItem && `color: white;`}
`;

export default function Header({
  categories,
  data,
  categories2,
  activeButton,
  prevPath,
  setActiveButton,
}) {
  const { cartItems, clength } = useContext(CartContext);
  const [hamActive, setHamActive] = useState(false);
  const [isHome, setIsHome] = useState('');
  const { higherMobile, isTablet, isHighMobile, isNavView } = UseIsDevice();
  const [showResults, setShowResults] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const rout = useRouter();
  const path = rout.pathname.split('/')[1];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsHome(path);
  }, [path]);

  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTop = useRef(0);

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;

    // Show/hide header based on scroll direction
    if (currentScrollTop > lastScrollTop.current && currentScrollTop > 50) {
      setIsVisible(false); // Scrolling down
    } else {
      setIsVisible(true); // Scrolling up
    }

    lastScrollTop.current = currentScrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };
  const toggleAcc = () => {
    setAccOpen((prev) => !prev);
  };

  // Dynamic import for MobNav
  // const MobNav = hamActive
  //   ? dynamic(() =>
  //       import('./icons/header/MobNav').then((mod) => mod.MobNav)
  //     )
  //   : null;

  return (
    <>
      {isMounted && !isHighMobile ? (
        <PreHeader />
      ) : (
        <div className="h-[26px] bg-gray-200 animate-pulse hidden md:block"></div>
      )}
      <div className={isVisible ? `sticky z-30 top-[-1px] left-0 w-full` : ''}>
        {isMounted ? (
          <StyledHeader style={{ zIndex: '20', position: 'relative' }}>
            <Wrapper header>
              <HeadWrapper>
                <Div>
                  <NavButton
                    hasItem
                    onClick={() => setHamActive((prev) => !prev)}
                  >
                    <MenuSharp style={{ fontSize: '1.77rem' }} />
                  </NavButton>

                  <Link
                    className="text-white no-underline relative z-30 p-0 pr-2.5 pt-5 border-r-0 w-[95px] h-full transition-[padding] duration-300 ease-in-out md:pr-3.5 md:pt-2 md:w-[100px] md:flex md:justify-center md:items-center lg:pr-5"
                    href={'/'}
                  >
                    <img src="/images/3.png" alt="Logo" />
                  </Link>
                  <NavForPc isHome={isHome} />
                </Div>

                <SearchBar
                  data={data}
                  searchContainerRef={searchContainerRef}
                  setShowInput={setShowInput}
                  setShowResults={setShowResults}
                  showInput={showInput}
                  showResults={showResults}
                />

                <NavIcons
                  cartItems={cartItems}
                  clength={clength}
                  toggleAcc={toggleAcc}
                  toggleCart={toggleCart}
                />
              </HeadWrapper>
            </Wrapper>
          </StyledHeader>
        ) : (
          <HeaderSkeleton />
        )}

        {hamActive && (
          <MobNav
            hamActive={hamActive}
            activeButton={activeButton}
            categories2={categories2}
            setHamActive={setHamActive}
            setActiveButton={setActiveButton}
          />
        )}

        {prevPath.current !== null &&
          isHome !== '' &&
          !higherMobile &&
          !isTablet && <CatNav categories={categories} prevPath={prevPath} />}

        <div style={{ zIndex: '18' }}>
          {!higherMobile && (
            <>
              <CartPreview
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                isVisible={isVisible}
              />
              <AccountNav
                accOpen={accOpen}
                setAccOpen={setAccOpen}
                isVisible={isVisible}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
