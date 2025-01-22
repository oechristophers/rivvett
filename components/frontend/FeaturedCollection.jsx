import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SkeletonLoader } from './ImageSkeleton';
import Link from 'next/link';
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 25px;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
    padding: 25px 0;
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
export default function FeaturedCollection({ femaleCollection, collections }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <StyledGrid>
        {!isLoaded && <SkeletonLoader />}
        {femaleCollection &&
          femaleCollection.map((collection, index) => (
            <Div
              href={`women/collections?collection=${collection}`}
              key={index}
            >
              <Image
                onLoadingComplete={() => setIsLoaded(true)}
                width={700}
                height={700}
                layout="responsive"
                src={`/images/women/${collection}.png`}
                alt={collection}
              />

              <Title>
                <b>{collection}</b>
              </Title>
            </Div>
          ))}
        {collections &&
          collections.map((collection, index) => (
            <Div href={`men/collections?collection=${collection}`} key={index}>
              <Image
                onLoadingComplete={() => setIsLoaded(true)}
                width={700}
                height={700}
                layout="responsive"
                src={`/images/men/${collection}.png`}
                alt={collection}
              />

              <Title>{collection}</Title>
            </Div>
          ))}
      </StyledGrid>
    </>
  );
}
