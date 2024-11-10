import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { ClipLoader } from "react-spinners";
import CartBag from "./icons/CartBag";

const ProductWrapper = styled.div`
  height: auto;
`;
const Box = styled(Link)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: auto;
  background-color: #78747488;
  object-fit: contain; /* Ensures images maintain aspect ratio and crop if needed */
  object-position: top;
  position: sticky;

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%; /* Adjust this to your desired max height */
  }
  section {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%;
    margin: 130px 0;
  }
`;

const Title = styled(Link)`
  font-size: ${({ inCart }) => (inCart ? "0.75rem" : "0.9rem")};
  letter-spacing: 1.4px;
  margin: 0;
  height: 30px;
  text-decoration: none;
  color: #000000d2;
  font-family: "Futura Std Medium";
  @media (max-width: 750px) {
    font-size: 0.85rem;
  }
`;

const ProductInfo = styled.div`
  margin-left: 3px;
  margin-top: 10px;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
`;
const Price = styled.div`
  font-size: 0.9rem;
  font-family: "Futura Std Bold";
  color: #0000008f;
`;
const CartB = styled(Button)`
  position: absolute;
  bottom: 0;
  padding-bottom: 10px;
  z-index: 100;
  width: 93%;
  text-align: center;
  justify-content: center;
  background: linear-gradient(to bottom left, white 50%, black 50%);
  background-size: 200% 200%;
  background-position: top right;
  transition: background-position 0.3s ease;

  &:hover {
    background-position: bottom left;
    color: white;
  }

  /* @media (max-width: 750px) {
    display: none;
  } */
`;

export default function ProductCard({
  genderName,
  _id,
  title,
  description,
  price,
  images,
  gender,
  inCart,
}) {
  // console.log(genderName)
  const url = "/" + genderName + "/product/" + _id;
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleMouseEnter = () => setIsHidden(false);
  const handleMouseLeave = () => setIsHidden(true);
  const { addItem } = useContext(CartContext);

  const handleImageLoad = () => {
    setLoading(false); // Once the image is fully loaded, set loading to false
  };
  const capitalizeFirstTwoWords = (two) => {
    const words = two.trim().split(" "); // Ensure there are no extra spaces
    if (words.length === 0) return ""; // Handle empty titles

    const firstTwoWords = words
      .slice(0, 2)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );

    // Return the first two words capitalized and the rest unchanged
    return [...firstTwoWords, ...words.slice(2)].join(" ");
  };

  return (
    <ProductWrapper>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        href={url}
      >
        {loading && (
          <section>
            <ClipLoader
              color="#000" // Adjust color as needed
              loading={loading}
              size={50} // Adjust size as needed
            />
          </section>
        )}
        <img
          src={images[0]}
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "block" }}
          alt={title}
        />
        {!isHidden && (
          <CartB
            primary
            onClick={(ev) => {
              ev.preventDefault(); // Prevent "Box link"  from navigating away
              ev.stopPropagation();
              addItem(_id);
            }}
          >
            Add to cart
          </CartB>
        )}
      </Box>
      <ProductInfo>
        <Title href={url} inCart={inCart}>
          {title}
          {/* {title.split(' ').slice(0, 2).map((word)=> word.toUpperCase()).join(' ') + (' ') + title.split(' ').slice(2).join('  ').toLowerCase()} */}
        </Title>
        <PriceRow>
          <Price>${price}</Price>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}
