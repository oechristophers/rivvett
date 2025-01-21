import styled from 'styled-components';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  gap: 10px;
  padding: 20px;
  @media screen and (max-width: 1030px) {
    grid-template-columns: ${({ page }) =>
      page ? ' repeat(auto-fit, minmax(150px, 1fr));' : '1fr 1fr 1fr'};
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: ${({ page }) =>
      page ? ' repeat(auto-fit, minmax(200px, 1fr));' : '1fr 1fr '};
    padding: 0 28px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;
const StyledCardContainer = styled.div`
  @media screen and (max-width: 1030px) {
    width: auto;
  }
`;

export default function ProductGrid({ products, page }) {
  const [prevPath, setPrevPath] = useState('');
  useEffect(()=>{
    if(typeof window !== 'undefined' && localStorage){
      const path = localStorage.getItem('prevPath');
      setPrevPath(path);
    }
  })
  return (
    <StyledGrid page={page}>
      {products?.length > 1 &&
        products.map((product) => (
          <StyledCardContainer>
            <ProductCard
              key={product._id}
              {...product}
              genderName={product.gender.name !=='unisex'? product.gender.name : prevPath? prevPath : 'women'}
            />
          </StyledCardContainer>
        ))}
    </StyledGrid>
  );
}
