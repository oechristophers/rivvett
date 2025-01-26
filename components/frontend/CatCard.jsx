import styled from 'styled-components';
import Button from './Button';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import CartBag from './icons/CartBag';
import Image from 'next/image';
import { SkeletonLoader } from './ImageSkeleton';

const ProductWrapper = styled.div``;
const Box = styled(Link)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: auto;
  object-fit: contain; /* Ensures images maintain aspect ratio and crop if needed */
  object-position: top;
  position: sticky;

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%; /* Adjust this to your desired max height */
  }
`;

export default function CategoryCard({ _id, name, images, filteredMaleCat }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const url =` /products?category=${_id}`;
  return (
    <ProductWrapper>
      <Box href={url}>
        {!isLoaded && <SkeletonLoader />}

        <Image
          width={700}
          height={700}
          layout="responsive"
          src={
            (filteredMaleCat && images[0]) ||
            (!filteredMaleCat && images[1] ? images[1] : images[0])
          }
          alt={name}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </Box>
    </ProductWrapper>
  );
}
