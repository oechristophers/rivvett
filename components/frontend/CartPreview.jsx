import {
  ArrowDownward,
  ArrowDropDown,
  ArrowUpward,
  Close,
} from '@mui/icons-material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import Table from './Table';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { CartContext } from './CartContext';
const MainDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${({ cartOpen }) => (cartOpen ? '50%' : '10px')}; /* Under header */
  right: 20px;
  width: 350px;
  padding: 0;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(${({ cartOpen }) => (cartOpen ? '0' : '-100%')});
  transition:
    transform 0.9s ease,
    opacity 0.8s ease;
  overflow: hidden;
  @media screen and (max-width: 950px) {
    margin-top: 24px;
  }
`;
// prettier-ignore
const Box = styled.div`
  ${(props) =>
    props.a &&
    `
      padding: 5px 20px;
      display: flex;
      background-color: #00000013;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 1rem;
        font-family: 'Futura Std Book';
      };
      span {
        font-family: 'Futura Std Book';
        padding-top: 3px;
      };
    `};

  ${(props) =>
    props.b &&
    `
      padding-left: 20px;
      max-height: 150px;
      overflow-y: scroll;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 0.8rem;
        letter-spacing: 1.2px;
        font-family: 'Futura Std Book';
      }

      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    `};
  ${(props) =>
    props.c &&
    `
      display: flex;
      justify-content: space-between;
      background-color: #8d8c8c13;
      padding: 5px 20px;
      padding-left: 10px;
      p {
        font-size: 0.85rem;
        font-family: 'Futura Std Book';
      }
    `}
  ${(props) =>
    props.d &&
    `
      background-color: #00000013;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 14px 20px;
      gap: 10px;
      border-bottom: 1px solid #00000024;
      border-top: 1px solid #00000024;

      a {
        text-align: center;
        padding: 12px 15px;
        width: 100%;
        font-size: 0.8rem;
        font-family: 'Futura Std Heavy';
        letter-spacing: 1.2px;
        color: #000000cc;
        text-transform: uppercase;
        cursor: pointer;
      }
    `};
  .view {
    background-color: white;
    border: 2px solid #4443437e;
  }

  .checkout {
    background-color: #018849;
    border: none;
    color: white;
  }
  
     /* prettier-ignore */
  ${(props) =>
    props.e &&
    `
      padding: 10px;
      display: flex;
      flex-direction: column;
      background-color: #00000013;
      align-items: center;
      gap: 10px;

      p {
        margin: 0;
        font-family: 'Futura Std Book';
        font-size: 0.9rem;
      };
      p:nth-of-type(2) {
        font-size: 0.7rem;
      };
    `}
`;
const ImageBox = styled.div`
  position: relative;
  width: 6rem;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Price = styled.h3`
  margin: 0;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: left;
  width: 100%;
  font-family: 'Futura Std Bold';
  color: #0000008f;
`;
const Title = styled.h2`
  width: 100%;
  margin: 0;
  font-family: 'Futura Std Heavy';
  text-align: left;
  letter-spacing: 2px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.7rem;
`;
const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover * {
    color: #2d77bc;
  }
`;
export default function CartPreview({ cartOpen, setCartOpen, isVisible }) {
  const [items, setItems] = useState([]);
  const {
    cartItems,
    setCartItems,
    addItem,
    removeItem,
    clearCart,
    removeWholeItem,
    itemProps,
    setItemProps,
    clength,
    setCLength,
  } = useContext(CartContext);

  useEffect(() => {
    const itemIds = cartItems.map((item) => item.split('-')[0]);
    // console.log(itemIds);
    if (cartItems.length > 0) {
      axios
        .post(`/api/frontend/cart`, { ids: itemIds })
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => console.error('Error fetching cart data:', error));
    } else {
      setItems([]);
    }
  }, [cartItems]);

  const prevLength = useRef(cartItems);

  useEffect(() => {
    if (
      prevLength.current !== undefined &&
      clength === prevLength.current + 1 &&
      addItem
    ) {
      setCartOpen(true); // Open cart if clength has incremented by 1

      // Close cart after 3 seconds
      const timeout = setTimeout(() => {
        setCartOpen(false);
      }, 3000);

      // Cleanup timeout on component unmount or before the next effect
      return () => clearTimeout(timeout);
    }
    prevLength.current = clength; // Update the previous length for the next render
  }, [clength]);

  // console.log(cartItems);
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };
  return (
    <div
      className={`
      absolute 
      flex 
      flex-col 
      right-[20px] 
      w-[350px] 
      p-0 
      bg-[#f8f9fa] 
      border 
      border-gray-300 
      rounded-md 
      shadow-lg 
      transition-top 
      ease-in-out 
      duration-700 
      transform 
      z-[12]
      overflow-hidden 
      ${cartOpen ? 'top-[60px] ' : 'top-[-600px] '}
      ${!isVisible ? 'mt-6' : 'mt-0'}
    `}
      cartOpen={cartOpen}
      onMouseEnter={() => setCartOpen(true)}
      onMouseLeave={() => setCartOpen(false)}
    >
      <Box a>
        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2>My Bag,</h2>
          <span>
            {clength} {clength === 1 ? 'item' : 'items'}
          </span>{' '}
        </section>
        <button className="cursor-pointer " onClick={() => setCartOpen(false)}>
          <Close style={{ fontSize: '2rem' }} />
        </button>
      </Box>

      <Box b>
        <Table>
          {(() => {
            // Group items by baseItemId and properties using reduce
            const groupedItems = cartItems.reduce((acc, itemId) => {
              const baseItemId = itemId.split('-')[0];
              const itemPropsForId = itemProps[itemId] || {};
              // Create a unique key based on baseItemId, color, and size
              const uniqueKey = `${baseItemId}-${itemPropsForId.color || ''}-${
                itemPropsForId.size || ''
              }`;
              // If this unique combination already exists, increment the quantity
              if (acc[uniqueKey]) {
                acc[uniqueKey].quantity += 1;
              } else {
                // Otherwise, create a new entry for this item
                acc[uniqueKey] = {
                  itemId: baseItemId,
                  itemProps: itemPropsForId,
                  quantity: 1,
                };
              }
              return acc;
            }, {});

            return Object.values(groupedItems)
              .reverse()
              .map(({ itemId, itemProps: propsForItem, quantity }) => {
                // Find the item data from the items array
                const itemstoDisplay = items.find((i) => i._id === itemId);
                //  console.log(itemstoDisplay)
                // Guard clause for missing item data
                if (!itemstoDisplay) return null;

                return (
                  <tr
                    key={`${itemId}-${propsForItem.color}-${propsForItem.size}`}
                    style={{ display: 'flex', gap: '20px' }}
                  >
                    <td>
                      <ImageBox>
                        {/* Display the product image */}
                        <Image
                          width={500}
                          height={500}
                          layout="responsive"
                          src={itemstoDisplay.images[0]}
                          alt={itemstoDisplay?.title}
                        />
                      </ImageBox>
                    </td>
                    <ItemLink
                      href={`/men/product/${itemstoDisplay._id}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <Price>${itemstoDisplay.price}</Price>
                      <Title>RIVVETT DESIGN {itemstoDisplay.title}</Title>
                      <div
                        style={{ display: 'flex', gap: '15px', width: '100%' }}
                      >
                        <span>
                          {`${itemId}-${propsForItem.color}-${propsForItem.size}
                      `
                            .split('-')[1]
                            .toUpperCase()}
                        </span>

                        <span>
                          {`${itemId}-${propsForItem.color}-${propsForItem.size}
                      `
                            .split('-')[2]
                            .replace('US Size', '')}
                        </span>
                        <span>
                          Qty:
                          {
                            cartItems.filter(
                              (item) =>
                                item ===
                                `${itemId}-${propsForItem.color}-${propsForItem.size}`,
                            ).length
                          }
                        </span>
                      </div>
                    </ItemLink>
                  </tr>
                );
              });
          })()}
        </Table>
      </Box>
      <Box c>
        <p>Sub-total(excluding sales tax)</p>
        <p>
          $
          {cartItems.reduce((totalPrice, itemId) => {
            // Extract base item ID (ignoring properties)
            const baseItemId = itemId.split('-')[0];

            // Get the properties for the current itemId or default to an empty object
            const itemPropsForId = itemProps[itemId] || {};

            // Filter items to match the base item ID
            const matchingItems = items.filter(
              (item) => item._id === baseItemId,
            );

            // Calculate the total price for the current itemId
            const priceForItemId = matchingItems.reduce((subtotal, item) => {
              return subtotal + item.price;
            }, 0);

            // Add the calculated price for this itemId to the running total
            return totalPrice + priceForItemId;
          }, 0)}
        </p>
      </Box>
      <Box d>
        <Link href={'/cart'} className="view">
          View Bag
        </Link>
        <button className="checkout">Checkout</button>
      </Box>
      <Box e>
        <p>Free Shipping Worldwide*</p>
        <p>
          More info <Link href={'/'}>here</Link>
        </p>
      </Box>
    </div>
  );
}

{
  /* <tr key={itemId}>
</tr> */
}
