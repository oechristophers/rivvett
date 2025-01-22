import styled from 'styled-components';
import Button from './Button';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { ClipLoader } from 'react-spinners';
import CartBag from './icons/CartBag';
import { UseIsDevice } from './DeviceView';
import { SkeletonLoader } from './ImageSkeleton';
import {
  DeleteOutlineOutlined,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import css from 'styled-jsx/css';
import { useRouter } from 'next/router';

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
  font-size: ${({ inCart }) => (inCart ? '0.75rem' : '0.9rem')};
  letter-spacing: 1.4px;
  margin: 0;
  height: 30px;
  text-decoration: none;
  color: #000000d2;
  font-family: 'Futura Std Medium';
  @media (max-width: 750px) {
    font-size: 0.85rem;
    height: 20px;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
    letter-spacing: 1.7px;
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
`;
const Price = styled.div`
  font-size: 0.9rem;
  font-family: 'Futura Std Bold';
  color: #0000008f;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 1.7px;
  }
`;
export const CartB = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  color: black;
  z-index: 100;
  border: 1px solid #a8a1a12a;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  justify-content: center;
  background-color: #f7f7f74b;
  transition: background-position 0.3s ease;
  .fave2 {
    display: none;
  }
  &:hover .fave2 {
    display: block;
  }
  &:hover .fave {
    display: none;
  }

  ${(props) =>
    props.inId &&
    css`
      background-color: #928f8f6f;
      margin: 0;
      height: 45px;
      width: 45px;
      position: unset;
    `}/* @media (max-width: 750px) {
    display: none;
  } */
`;
const Delete = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  color: black;
  z-index: 100;
  border: 1px solid #a8a1a12a;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  justify-content: center;
  background-color: #f7f7f74b;
  transition: background-position 0.3s ease;
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
  handleDelete,
  wishId,
}) {
  // console.log(genderName)
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  let defaultGender;

  if (typeof window !== 'undefined') {
    // Ensure this runs only on the client side
    defaultGender = localStorage.getItem('prevPath') || path;
  }
  const url =
    '/' +
    (genderName === 'unisex' ? defaultGender : genderName) +
    '/product/' +
    _id;

  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleMouseEnter = () => setIsHidden(false);
  const handleMouseLeave = () => setIsHidden(true);
  const { addItem,addFavourite } = useContext(CartContext);
  const { isMobile, isDesktop } = UseIsDevice();

  const handleRemove = () => {
    // Call handleDelete with the wishId when the button is clicked
    handleDelete(wishId);
  };

  const handleImageLoad = () => {
    setLoading(false); // Once the image is fully loaded, set loading to false
  };
  const capitalizeFirstTwoWords = (two) => {
    const words = two.trim().split(' '); // Ensure there are no extra spaces
    if (words.length === 0) return ''; // Handle empty titles

    const firstTwoWords = words
      .slice(0, 2)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );

    // Return the first two words capitalized and the rest unchanged
    return [...firstTwoWords, ...words.slice(2)].join(' ');
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
            <SkeletonLoader />
          </section>
        )}
        <img
          src={images[0]}
          onLoad={handleImageLoad}
          style={{ display: loading ? 'none' : 'block' }}
          alt={title}
        />

        {path === 'favourites' ? (
          <Delete
            primary
            onClick={(ev) => {
              ev.preventDefault(); // Prevent "Box link"  from navigating away
              ev.stopPropagation();
              handleRemove();
            }}
          >
            <DeleteOutlineOutlined
              style={{
                fontSize: '1.3rem',
                width: '30px',
                height: '40px',
                paddingLeft: '4.5px',
                paddingTop: '2px',
              }}
            />
          </Delete>
        ) : (
          <CartB
            primary
            onClick={(ev) => {
              ev.preventDefault(); // Prevent "Box link"  from navigating away
              ev.stopPropagation();
              addFavourite(_id, 'Blue', 'S')
            }}
          >
            <FavoriteBorderOutlined
              className="fave"
              style={{
                fontSize: '1rem',
                width: '20px',
                height: '20px',
                paddingLeft: '4.5px',
                paddingTop: '2px',
              }}
            />

            <Favorite
              className="fave2"
              style={{
                fontSize: '1rem',
                width: '20px',
                height: '20px',
                paddingLeft: '4.5px',
                paddingTop: '2px',
              }}
            />
          </CartB>
        )}
      </Box>
      <ProductInfo>
        <Title href={url} inCart={inCart} className='truncate'>
          {title}
          {/* {title.length > 20 ? title.slice(0, 20) + '...' : title} */}
          {/* {title.split(' ').slice(0, 2).map((word)=> word.toUpperCase()).join(' ') + (' ') + title.split(' ').slice(2).join('  ').toLowerCase()} */}
        </Title>
        <PriceRow>
          <Price>${price}</Price>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}
