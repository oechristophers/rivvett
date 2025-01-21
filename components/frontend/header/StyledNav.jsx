import {
  Close,
  FavoriteBorderSharp,
  PersonOutlineSharp,
  WorkOutlineSharp,
  WorkSharp,
} from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import { UseIsDevice } from '../DeviceView';
import Link from 'next/link';
import FooterIcons from '../FooterIcons';
import Footer from '../Footer';
import CategoryList from '../CategoryNavigate';

const Button = styled.button`
  width: 50%;
  color: black;
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #0000002a;
  cursor: pointer;
  padding: 12px 0;
  font-family: 'Futura Std Heavy';
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1.5px;

  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 4px solid #ad2e2e9e;
    `}
`;

const Nav = styled.nav`
  .genderNav {
    display: flex;
    width: 100%;
  }

  .nav-content {
    overflow-y: auto;
  }

  .nav-content::-webkit-scrollbar {
    display: none;
  }

  .modal {
    width: calc(100% - 340px);
    background-color: #00000061;
    position: fixed;
    height: 102vh;
    z-index: 2000;
    left: 340px;
  }

  .close {
    background-color: #222;
    border: 2px solid whitesmoke;
    border-radius: 3px;
    position: fixed;
    left: 0;
    cursor: pointer;
    z-index: 3000;
    top: 0;
    margin-left: 350px;
    height: 40px;
    padding: 0 1px;

    &:hover {
      background-color: #333;
    }

    @media screen and (min-width: 950px) {
      display: none;
    }
  }

  ${(props) =>
    props.mobNav
      ? css`
          display: flex;
          position: absolute;
          height: 105vh;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          transform: translate(0);
          transition: transform 0.3s ease;
          &.inactive {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          &.active {
            transform: translateX(0);
            transition: transform 0.3s ease;
          }
          @media screen and (min-width: 950px) {
            display: none;
          }
        `
      : css`
          display: none;
        `}

  ${(props) =>
    props.forMobile &&
    css`
      background-color: white;
      transition: background-color 0.3s ease;
    `}

  padding-bottom: 29px;

  ${(props) => props.forPc && `display: none;`}

  @media screen and (min-width: 950px) {
    gap: 25px;

    ${(props) =>
      props.forPc &&
      `
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 240px;
        gap: 0px;
      `}

    position: static;
    padding: 0;
  }

  ${(props) =>
    props.forMobile &&
    css`
      display: flex;
      flex-direction: column;
      border: 2px solid white;
      z-index: 2000;
      max-width: 400px;
      overflow: auto;
      padding: 0;
    `};
  @media screen and (max-width: 980px) {
    ${(props) => props.forPc && `display: none;`}
  }

  @media screen and (max-width: 500px) {
    ${(props) =>
      props.forMobile &&
      css`
        width: 88%;
      `}
    .modal {
      width: 18%;
      left: 82.5%;
    }
    .close {
      margin-left: 82%;
    }
    .more strong {
      font-size: 0.6rem;
    }
    .more-1 {
      strong {
        font-size: 0.8rem;
      }
    }
  }

  ${(props) =>
    props.isNavIcons &&
    css`
      display: flex;
      position: static;
      padding: 0;
      gap: 25px;
    `}
`;
const Subscript = styled.sub`
  font-size: 0.6em;
  margin-left: -15.5px;
  z-index: 90;
  color: black;
  cursor: default;
`;

const IconDiv = styled.div`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0;
  padding-top: 20px;
  padding-bottom: 3px;
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0;
  padding-top: 20px;
  padding-bottom: 10px;
  @media screen and (min-width: 768px) {
    padding: 0;
    padding-top: 20px;
    ${(props) =>
      props.isGender &&
      css`
        color: white;
        text-align: center;
        font-family: 'Futura Std Bold';
        font-size: 0.8rem;
        letter-spacing: 2px;
        padding-top: 22px;
        border-right: 1px solid #403f3f;
        border-left: 1px solid #403f3f;
        &:hover {
          background-color: #403f3f6a;
        }
      `}
  }
  ${(props) =>
    props.isHome &&
    css`
      background-color: #403f3f;
      &:hover {
        background-color: #403f3f;
      }
    `}
`;

export function NavForPc({ isHome }) {
  return (
    <Nav forPc>
      <NavLink isGender isHome={isHome === 'women'} href={'/women'}>
        WOMEN
      </NavLink>
      <NavLink isGender isHome={isHome === 'men'} href={'/men'}>
        MEN
      </NavLink>
    </Nav>
  );
}

export function NavIcons({ toggleAcc, cartItems, clength, toggleCart }) {
  const { isHighMobile } = UseIsDevice();
  return (
    <Nav isNavIcons style={{ zIndex: '10' }}>
      <IconDiv
        onClick={toggleAcc}
        onMouseEnter={toggleAcc}
        onMouseLeave={toggleAcc}
      >
        <PersonOutlineSharp
          style={{ fontSize: '1.77rem', marginTop: '-3px' }}
        />
      </IconDiv>
      <NavLink href={'/favourites'}>
        <FavoriteBorderSharp />
      </NavLink>

      {isHighMobile ? (
        <NavLink href={'/cart'}>
          {cartItems.length > 0 ? (
            <div className="relative">
              <WorkSharp className="" />
              <Subscript className="absolute top-0 mt-[16px]">
                {clength}
              </Subscript>
            </div>
          ) : (
            <WorkOutlineSharp style={{ fontSize: '1.5rem' }} />
          )}
        </NavLink>
      ) : cartItems.length < 1 ? (
        <NavLink href={'/cart'}>
          {cartItems.length > 0 ? (
            <>
              <WorkSharp />
              <Subscript>{clength}</Subscript>
            </>
          ) : (
            <WorkOutlineSharp style={{ fontSize: '1.5rem' }} />
          )}
        </NavLink>
      ) : (
        <IconDiv
          onClick={toggleCart}
          onMouseEnter={toggleCart}
          onMouseLeave={toggleCart}
        >
          {cartItems.length < 1 ? (
            <WorkOutlineSharp style={{ fontSize: '1.5rem' }} />
          ) : (
            <div className="relative">
              <WorkSharp className="" />
              <Subscript className="absolute top-0 mt-[16px]">
                {clength}
              </Subscript>
            </div>
          )}
        </IconDiv>
      )}
    </Nav>
  );
}

export function MobNav({
  hamActive,
  activeButton,
  categories2,
  setHamActive,
  setActiveButton,
}) {
  return (
    <Nav mobNav className={hamActive ? 'active' : 'inactive'}>
      <Nav forMobile>
        <div className="genderNav">
          <Button
            isActive={activeButton === 'men'}
            onClick={() => setActiveButton('men')}
          >
            Men
          </Button>
          <Button
            isActive={activeButton === 'women'}
            onClick={() => setActiveButton('women')}
          >
            Women
          </Button>
        </div>
        <div className="overflow-y-scroll h-screen pt-6 no-scroll">
          <div className="nav-content">
            <CategoryList
              activeButton={activeButton}
              categories={categories2}
            />
            <div className="more">
              <h2 className="">MORE RIVVETT</h2>
              <div className="grid grid-cols-2 gap-[20px] p-[20px] bg-white">
                <div className="mDiv">
                  <section className="more-1">
                    <strong>rivett premier</strong>
                  </section>
                  <p className=" ">unlimited express delivery</p>
                </div>
                <div className="mDiv">
                  <section className="more-2">
                    <strong>
                      <span>rivett students</span>
                    </strong>
                  </section>
                  <p className=" ">10% student discount</p>
                </div>
                <div className="mDiv">
                  <section className="more-3"></section>
                  <p className=" ">gift vouchers</p>
                </div>
                <div className="mDiv">
                  <section className="more-4"></section>
                  <p className=" ">download the app</p>
                </div>
              </div>
            </div>
          </div>{' '}
          <FooterIcons activeButton={activeButton} />
          <Footer activeButton={activeButton} />
        </div>
      </Nav>
      <span className="close">
        <Close
          style={{
            color: 'white',
            fontSize: '2rem',
            paddingTop: '2px',
          }}
          onClick={() => setHamActive(false)}
        />
      </span>
      <div className="modal" onClick={() => setHamActive(false)}></div>
    </Nav>
  );
}
export default function StyledNav() {
  return <div>StyledNav</div>;
}
