import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { SkeletonLoader } from "./ImageSkeleton";
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
const Div = styled.div`
  img {
    width: 100%;
    height: auto; /* Adjust this to your desired max height */
  }
`;
const Title = styled.h2`
  text-align: center;
  font-family: "Futura Std Heavy";
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 1.3px;
`;
export default function FeaturedCollection({ femaleCollection, collections }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <StyledGrid>
        {!isLoaded && (<SkeletonLoader/>)}
        {femaleCollection &&
          femaleCollection.map((collection, index) => (
            <Div key={index}>
              <Image
                onLoadingComplete={() => setIsLoaded(true)}
                width={700}
                height={700}
                layout="responsive"
                src={`/images/women/${collection}.png`}
                alt={collection}
              />

              <Title>{collection}</Title>
            </Div>
          ))}
        {collections &&
          collections.map((collection, index) => (
            <Div key={index}>
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
