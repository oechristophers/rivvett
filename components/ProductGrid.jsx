import styled from "styled-components";
import ProductCard from "./ProductCard";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns:${({page})=> (page? '1fr 1fr 1fr 1fr 1fr': '1fr 1fr 1fr 1fr')};
  gap: 10px;
  padding: 20px;
  @media screen and (max-width:1030px) {
    grid-template-columns: 1fr 1fr 1fr ;
    column-gap:5px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 28px;
  }
  @media screen and (max-width: 600px) {
 padding: 0 ;
  }

`;

export default function ProductGrid({ products, page, genderName }) {
  return (
    <StyledGrid page={page}>
      {products?.length > 1 &&
        products.map((product) => <ProductCard key={product._id} {...product} genderName={genderName} />)}
    </StyledGrid>
  );
}
