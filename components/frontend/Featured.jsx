import React, { useContext } from 'react';
import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { CartContext } from './CartContext';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 40px;
  img {
    width: 100%;
    max-height: 30rem;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      width: 100%;
      max-height: 20rem;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.icol && ` padding: 0 50px;`}
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export default function Featured({ product }) {
  const { addItem } = useContext(CartContext);
  function addToCart() {
    addItem((prev) => [...prev, product._id]);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/products/' + product._id} white outline>
                  Read more
                </ButtonLink>

                <Button onClick={addToCart} primary>
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column icol>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/next-e-commerce-978e3.appspot.com/o/1720806721976-overDistressed3.webp?alt=media&token=24641816-cae5-4a0f-98f7-e7a93c96b033"
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
