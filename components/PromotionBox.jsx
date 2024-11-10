import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonLink from "./ButtonLink";

const ProWrapper = styled.div`
  background: pink;
  display: flex;
  justify-content: space-between;
  padding: 8px 25px;
  letter-spacing: 1.5px;
  ${(props) =>
    props.gender &&
    `
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 3px 0;

    :first-child:not(:last-of-type) {
  background: #9cf0e0;
}
    :nth-child(2){
    background:black;
    color: white;
    }
    
    `}
`;

const ProLink = styled(ButtonLink)`
  border: 2px solid black;
  text-align: center;
  justify-content: center;
  padding: 5px 12px;
  padding-left: 13px;
  font-family: "Futura Std Bold";
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: black;
  ${(props)=> props.home && `
     max-width: 70px; 
  `}
  ${(props) =>
    props.gender &&
    `
  border:none;
  max-width: 100%;
  padding:8px 0;
  font-size: .8rem;
  line-height: 1.4;
  margin:-3px 0 ;
  
 `}
  ${(props) =>
    props.banner &&
    `
  border:none;
  font-size: .8rem;
  line-height: .9;
  display:block;
  margin-bottom:25px;
  background:linear-gradient(90deg, #9CF0E0 0%, #26E066 100%);
 @media screen and (max-width: 1024px){
  
 }
 `}
`;
const Title = styled.h3`
  padding-left: 13px;
  font-family: "Futura Std bold";
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  margin: 0;
  padding: 7px 0;
  ${(props) =>
    props.banner &&
    `
   font-size: 2.8rem;
   letter-spacing: 1.3px;
   font-family: "Futura Std Extra Bold Oblique";
  `}
`;
const Div = styled.div`
  margin-top: 0;
  ${(props) =>
    props.banner &&
    `
   display:grid;
   grid-template-columns: 1fr;
  `}
`;
const Span = styled.span`
  margin-top: 0;
  border: 2px solid black;
  padding: 2px 10px;
  ${(props) =>
    props.gender &&
    `
   border: none;
   padding: 0;
   font-family: "Futura Std Light";
   font-size: 0.7rem;
  `}
`;
const Sect = styled.section`
  padding: 10px 0;
  font-size: 1.3rem;
  font-weight: bolder;
  font-family: "Futura Std Heavy";
`;
const P = styled.p`
  font-size: 0.7rem;
  padding-top: 7px;
  letter-spacing: 0.8px;
  font-family: "Futura Std Light";
`;
const B = styled.b`
  font-weight: 800;
`;
export default function PromotionBox() {
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
    <Div>
      {isHome === "men" && isBigScreen && (
        <>
          <ProWrapper gender>
            <ProLink gender href={"/"}>
              <strong>
                <B>30%</B> OFF FALL LOOKS* <br />
                With code: FALL
              </strong>
            </ProLink>
            <ProLink gender href={"/"}>
              <strong>
                FREE DELIVERY* & EASY RETURNS <br />
                <Span gender>Find out more</Span>
              </strong>
            </ProLink>
          </ProWrapper>
          <Div banner>
            <ProLink banner href={"/"}>
              <Title banner>30% OFF FALL LOOKS</Title>
              <br />
              <Sect>
                With code:&nbsp;<Span>FALL</Span>
              </Sect>
              <P>
                See website banner for Ts&Cs. Selected marked products excluded
                from promo.
              </P>
            </ProLink>
          </Div>
        </>
      )}
      {isHome === "women" && isBigScreen && (
        <>
          <ProWrapper gender>
            <ProLink gender href={"/"}>
              <strong>
                <B>30%</B> OFF FALL LOOKS* <br />
                With code: FALL
              </strong>
            </ProLink>
            <ProLink gender href={"/"}>
              <strong>
                FREE DELIVERY* & EASY RETURNS <br />
                <Span gender>Find out more</Span>
              </strong>
            </ProLink>
          </ProWrapper>
          <ProLink banner href={"/"}>
            <Title banner>30% OFF FALL LOOKS</Title>
            <br />
            <Sect>
              With code:&nbsp;<Span>FALL</Span>
            </Sect>
            <P>
              See website banner for Ts&Cs. Selected marked products excluded
              from promo.
            </P>
          </ProLink>
        </>
      )}
      {isHome === "" && isBigScreen && (
        <ProWrapper>
          <ProLink home href={"/"}>WOMEN</ProLink>
          <Title>THE UP-TO-30%-OFF EDIT</Title>
          <ProLink home href={"/"}>MEN</ProLink>
        </ProWrapper>
      )}
    </Div>
  );
}

// futura-pt, FuturaStd, Helvetica, Arial, sans-serif
// body {
//   font-family: futura-pt, Tahoma, Geneva, Verdana, Arial, sans-serif;
// }
