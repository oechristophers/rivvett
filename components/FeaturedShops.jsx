import React from "react";
import styled from "styled-components";
import { Title } from "./ProductCarousel";
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 25px;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
    padding: 15px;
  }
`;
const Div = styled.div`
  img {
    width: 100%;
    height: auto; /* Adjust this to your desired max height */
  }
`;
const SubTitle = styled.h2`
text-align: center;
font-family: "Futura Std Heavy";
text-transform: uppercase;
font-size: 1rem;
letter-spacing: 1.3px;
`
const H1 = styled(Title)`
  padding-bottom: 0;
  padding-top:10px;
  font-size: 1.3rem;
`
export default function FeaturedShops({
 shops,
 femaleShops,
}) {
 
  return (
    <div>
      <H1>FEATURED SHOPS</H1>
      <StyledGrid>
        {shops &&
          shops.map((shop) => (
            <Div>
              <img src={`/images/men/${shop}.png`} alt={shop} />

              <SubTitle>{shop}</SubTitle>
            </Div>
          ))}
        {femaleShops &&
          femaleShops.map((shop) => (
            <Div>
              <img src={`/images/women/${shop}.png`} alt={shop} />

              <SubTitle>{shop}</SubTitle>
            </Div>
          ))}
      </StyledGrid>
    </div>
  );
}
