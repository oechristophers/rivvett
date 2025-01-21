import React from 'react';
import styled from 'styled-components';
import { Title } from './ProductCarousel';
import Wrapper from './Wrapper';
import { useRouter } from 'next/router';

const Wrap = styled.div`
  padding: 20px 35px;
  padding-bottom: 45px;
  @media screen and (max-width: 768px) {
    padding: 20px 15px;
  }
`;
const StyledTitle = styled(Title)``;
const Sect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 10px;
    & > *:not(:first-child) {
      border-top: 1px solid;
      padding-top: 20px;
      padding-bottom: 10px;
    }
  }
`;
const Pname = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 1px;
  font-family: 'Futura Std Book';
  font-weight: lighter;
`;

const Span = styled.span`
  text-transform: capitalize;
`;

export default function ShopMore({ products }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  return (
    <Wrap>
      <StyledTitle>Shop More</StyledTitle>
      <Sect>
        {products &&
          products.map((product) => (
            <Pname key={product._id}>
              <Span>{path}&apos;s</Span> {product.title}
            </Pname>
          ))}
      </Sect>
    </Wrap>
  );
}
