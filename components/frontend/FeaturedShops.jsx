import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { SkeletonLoader } from './ImageSkeleton';
import Link from 'next/link';
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 25px;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
    padding: 15px 0;
  }
`;
const Div = styled(Link)`
  img {
    width: 100%;
    height: auto; /* Adjust this to your desired max height */
  }
`;
const Title = styled.h2`
  text-align: center;
  font-family: 'Futura Std Heavy';
  text-transform: uppercase;
  padding-top: 10px;
  font-size: 1rem;
  letter-spacing: 1.3px;
  @media screen and (max-width: 500px) {
    font-size: 0.6rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std book';
    font-weight: 900;
  }
`;
const H1 = styled(Title)`
  padding-bottom: 0;
  padding-top: 10px;
  font-size: 1.3rem;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 2.3px;
    font-family: 'Futura Std heavy';
    font-weight: 900;
  }
`;
export default function FeaturedShops({ shops, femaleShops }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <H1>FEATURED SHOPS</H1>
      <StyledGrid>
        {!isLoaded && <SkeletonLoader />}
        {femaleShops &&
          femaleShops.map((shop, index) => (
            <Div href={`women/shops?shop=${shop}`} key={index}>
              <Image
                onLoadingComplete={() => setIsLoaded(true)}
                width={700}
                height={700}
                layout="responsive"
                src={`/images/women/${shop}.png`}
                alt={shop}
              />

              <Title>
                <b>{shop}</b>
              </Title>
            </Div>
          ))}
        {shops &&
          shops.map((shop, index) => (
            <Div href={`men/shops?shop=${shop}`} key={index}>
              <Image
                onLoadingComplete={() => setIsLoaded(true)}
                width={700}
                height={700}
                layout="responsive"
                src={`/images/men/${shop}.png`}
                alt={shop}
              />

              <Title>{shop}</Title>
            </Div>
          ))}
      </StyledGrid>
    </>
  );
}
