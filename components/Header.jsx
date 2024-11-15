import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import Wrapper from "./Wrapper";
import CartBag from "./icons/CartBag";
import UserIcon from "./icons/User";
import FavsIcon from "./icons/Favourites";
import Input from "./Input";
import SearchIcon from "./icons/SearchIcon";
import Search from "./Search";
import CatNav from "./CategoryNavigate";
import { UseIsDevice } from "./DeviceView";
import { useRouter } from "next/router";
import css from "styled-jsx/css";
import {
  Close,
  FavoriteBorderSharp,
  MenuSharp,
  Person,
  PersonOutline,
  PersonOutlineSharp,
  PersonSharp,
  WorkOutlineSharp,
  WorkSharp,
} from "@mui/icons-material";
import FooterIcons from "./FooterIcons";
import Footer from "./Footer";
import Image from "next/image";

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
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  padding: 0;
  padding-right: 10px;
  padding-top: 23px;
  border-right: none;
  img {
    width: 75px;
    height: 23px;
  }

  @media screen and (min-width: 768px) {
    padding-right: 15px;
    padding-top: 18px;
    img {
      width: 86px;
      height: 28px;
    }
  }
`;
const PreHeader = styled.div`
  background-color: white;
  display: flex;
  padding: 0 40px;
  justify-content: right;
  height: 25px;
  img {
    width: 15px;
    height: 15px;
  }
  div {
    display: flex;
    height: 100%;
    & > :first-of-type {
      border-left: 1px solid #0000002a;
    }
  }
  a {
    padding: 0 15px;
    padding-top: 5px;
    border-right: 1px solid #0000002a;
    height: 100%;
    text-decoration: none;
    color: #000000b5;
    font-family: "Futura Std Book";
    letter-spacing: 1.2px;
    font-size: 0.7rem;
  }
  @media screen and (max-width: 950px) {
    display: none;
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
const Button = styled.button`
  width: 50%;
  color: black;
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #0000002a;
  cursor: pointer;
  padding: 12px 0;
  font-family: "Futura Std Heavy";
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1.5px;

  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 4px solid #ad2e2e9e;
    `}
`;
const StyledNav = styled.nav`
  .genderNav {
    display: flex;
    padding-bottom: 10px;
    width: 100%;
  }

  .nav-content {
    overflow-y: auto;
    .more {
      padding-bottom: 20px;
      background-color: #e8e5e5;
      .mDiv {
        border: 1px solid #0000002a;
      }
      p {
        font-size: 0.7rem;
        text-align: center;
        text-transform: uppercase;
        font-family: "Futura Std Heavy";
        letter-spacing: 1.3px;
        padding: 0 5px;
      }
      .more-1 {
        background: url("/images/rainbow.jpg");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .more-2 {
        background: linear-gradient(to top, #b7e10f, #cdef07);
        span {
          border: 2px solid;
          border-radius: 9999px;
          padding: 5px 10px;
        }
      }
      .more-3 {
        background: url("/images/gift.webp");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .more-4 {
        background: url("/images/app.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .more h2 {
      font-size: 0.8rem;
      font-family: "Futura Std Heavy";
      letter-spacing: 1.5px;
      padding-left: 20px;
      padding-top: 30px;
      padding-bottom: 10px;
    }
    .more section {
      height: 100px;
      background-color: blue;
      display: flex;
      font-size: 1rem;
      align-items: center;
      justify-content: center;
      font-family: "Futura Std Book";
      letter-spacing: 1.4px;
    }
    .sect-div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 20px 20px;
      background-color: white;
    }
  }

  .nav-content::-webkit-scrollbar {
    display: none;
  }

  .modal {
    width: calc(100% - 403px);
    background-color: #00000061;
    position: fixed;
    height: 102vh;
    z-index: 2000;
    right: 0;
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
    margin-left: 402px;
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
          position: fixed;
          height: 100vh;
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
  gap: 25px;

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
    `}

  @media screen and (max-width: 950px) {
    ${(props) => props.forPc && `display: none;`}
  }
  @media screen and (max-width: 500px) {
    ${(props) =>
      props.forMobile &&
      css`
        max-width: 75%;
      `}
    .modal {
      width: 24.3%;
    }
    .close {
      margin-left: 75%;
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
    `}
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0;
  padding-top: 20px;
  padding-bottom: 3px;
  @media screen and (min-width: 768px) {
    padding: 0;
    padding-top: 20px;
    ${(props) =>
      props.isGender &&
      ` color: white; 
      text-align: center;  
      font-family: "Futura Std Bold";
  font-size: 0.8rem;
  letter-spacing: 2px;
  padding-top: 22px;
  border-right: 1px solid #403f3f;
   border-left:  1px solid #403f3f; 
   &:hover{
   background-color: #403f3f6a;
   }`}
  }
  ${(props) =>
    props.isHome &&
    ` background-color: #403f3f; &:hover{
   background-color: #403f3f;
   }`}
`;
const Div = styled.div`
  display: flex;
  position: relative;
  .Scontain {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .flexed {
    display: flex;
    padding-top: 13px;
    position: relative;
  }

  ${(props) =>
    props.search &&
    `
    
    margin-left: 40px;
    margin-right: 40px;
    width:100%;
  `}
  @media screen and (max-width:800px) {
    ${(props) =>
      props.showInput &&
      css`
        position: absolute;
        margin: 0;
        padding: 0;
        z-index: 1000;
      `}
  }
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
  ${(props) => props.hasItem && ` color: white; `}
`;
const Subscript = styled.sub`
  font-size: 0.6em;
  margin-left: -15px;
  margin-top: 7px;
  position: absolute;
  color: black;
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
  const [navActive, setNavActive] = useState(false);
  const [isHome, setIsHome] = useState("");
  const { higherMobile, isSmallTab, isTablet,isDesktop,isNavView } = UseIsDevice();
  const [showResults, setShowResults] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const searchContainerRef = useRef(null);

  const rout = useRouter();
  const path = rout.pathname.split("/")[1];
  useEffect(() => {
    if (path === "men") {
      setIsHome("men");
    } else if (path.includes("women")) {
      setIsHome("women");
    } else {
      path !== "" && setIsHome("general");
    }
  }, [path]);

  useEffect(() => {
   {isNavView && setHamActive(false)}
  }, [isNavView]);

  // const data = [
  //   { id: 1, name: "T-shirt", type: "product" },
  //   { id: 2, name: "Jeans", type: "product" },
  //   { id: 3, name: "Spring Sale", type: "blog" },
  //   { id: 4, name: "How to Style", type: "blog" },
  //   { id: 5, name: "Hats", type: "category" },
  //   { id: 6, name: "Outerwear", type: "category" },
  //   { id: 7, name: "Downtown Shop", type: "shop" },
  //   { id: 8, name: "Urban Fashion", type: "shop" },
  // ];

  return (
    <>
      <PreHeader>
        <div className="pre" style={{position:'relative'}}>
          <Link href={"/"}>Marketplace</Link>
          <Link href={"/blog"}>Help & FAQ&apos;s</Link>
          <Link href={"/contact"}>
            {" "}
            <Image width={100} height={100} layout="intrinsic" src="/flags/us.png" alt="" />{" "}
          </Link>
        </div>
      </PreHeader>
      <StyledHeader>
        <Wrapper header>
          <HeadWrapper>
            <Div>
              <NavButton hasItem onClick={() => setHamActive((prev) => !prev)}>
                <MenuSharp style={{ fontSize: "1.77rem" }} />
              </NavButton>
              <Logo href={"/"}>
              <Image width={100} height={100}  src="/images/3.png" alt="Logo" />
              </Logo>
              <StyledNav forPc>
                <NavLink isGender isHome={isHome === "women"} href={"/women"}>
                  WOMEN
                </NavLink>
                <NavLink isGender isHome={isHome === "men"} href={"/men"}>
                  MEN
                </NavLink>
              </StyledNav>
            </Div>

            <Div
              ref={searchContainerRef}
              showResults={showResults}
              showInput={showInput}
              tabIndex={0} // Make the container focusable
              onFocus={() => {
                setShowInput(true);
                setShowResults(true);
              }}
              onBlur={() =>{
                setShowResults(false);
              }}
              search
            >
              <Search
                showResults={showResults}
                showInput={showInput}
                setShowInput={setShowInput}
                setShowResults={setShowResults}
                data={data}
              />
            </Div>

            <StyledNav isNavIcons>
              <NavLink UserIcon href={"/account"}>
                <PersonOutlineSharp
                  style={{ fontSize: "1.77rem", marginTop: "-3px" }}
                />
              </NavLink>
              <NavLink href={"/saved"}>
                <FavoriteBorderSharp />
              </NavLink>
              <NavLink href="/cart">
                {cartItems.length > 0 ? (
                  <>
                    <WorkSharp />
                    <Subscript>{clength}</Subscript>
                  </>
                ) : (
                  <WorkOutlineSharp style={{ fontSize: "1.5rem" }} />
                )}
              </NavLink>
            </StyledNav>

              <StyledNav mobNav className={hamActive ? "active" : "inactive"}>
                <StyledNav forMobile>
                  <div className="genderNav">
                    <Button
                      isActive={activeButton === "men"}
                      onClick={() => setActiveButton("men")}
                    >
                      Men
                    </Button>
                    <Button
                      isActive={activeButton === "women"}
                      onClick={() => setActiveButton("women")}
                    >
                      Women
                    </Button>
                  </div>
                  <div className="nav-content">
                    <CatNav
                      activeButton={activeButton}
                      categories={categories2}
                    />
                    <div className="more">
                      <h2>MORE RIVVETT</h2>
                      <div className="sect-div">
                        <div className="mDiv">
                          {" "}
                          <section className="more-1">
                            <strong>rivett premier</strong>
                          </section>
                          <p>unlimited express delivery</p>
                        </div>{" "}
                        <div className="mDiv">
                          <section className="more-2">
                            <strong>
                              <span>rivett students</span>
                            </strong>
                          </section>
                          <p>10% student discount</p>
                        </div>
                        <div className="mDiv">
                          {" "}
                          <section className="more-3"></section>
                          <p>gift vouchers</p>
                        </div>
                        <div className="mDiv">
                          {" "}
                          <section className="more-4"></section>
                          <p>download the app</p>
                        </div>
                      </div>
                    </div>
                    <FooterIcons activeButton={activeButton} />
                    <Footer activeButton={activeButton} />
                  </div>
                </StyledNav>
                <span className="close">
                  <Close
                    style={{
                      color: "white",
                      fontSize: "2rem",
                      paddingTop: "2px",
                    }}
                    onClick={() => setHamActive(false)}
                  />
                </span>
                <div
                  className="modal"
                  onClick={() => setHamActive(false)}
                ></div>
              </StyledNav>
          </HeadWrapper>
        </Wrapper>
      </StyledHeader>
      {prevPath.current !== null &&
        isHome !== "" &&
        !higherMobile &&
        !isTablet && <CatNav categories={categories} />}
    </>
  );
}
