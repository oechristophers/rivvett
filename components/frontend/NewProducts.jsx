import styled from 'styled-components';
import Center from './Center';
import ProductGrid from './ProductGrid';
import Wrapper from './Wrapper';

const Heading = styled.h2`
  padding-left: 20px;
  margin: 30px 0 10px;
  font-weight: 400;
`;

export default function NewProducts({ products }) {
  return (
    <Wrapper>
      <Heading>New Arrivals</Heading>
      <ProductGrid products={products} />
    </Wrapper>
  );
}
