import React from 'react';
import Table from '../Table';
import InfoCell from './InfoCell';
import ImageBox from './ImageBox';
import Image from 'next/image';
import Div from './Div';
import P from './Paragraph';
import Link from 'next/link';
import { Arrow, SizeSelect } from '../ProdInfo';
import {
  ArrowDropDown,
  Close,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import Button from '../Button';

export const ControlBtn = styled(Button)`
  background-color: transparent;
  align-items: center;

  ${(props) =>
    props.fav &&
    css`
      padding: 5px;
      padding-right: 12px;
      padding-left: 0;
      float: left;
      font-size: 0.8rem;
      border: 1px solid;
    `}

  span {
    transform: translateX(5px);
    margin: 0;
  }
`;

export default function CartTable({
  cartItems,
  itemProps,
  setCLength,
  setCartItems,
  setItemProps,
  setTotal,
  handleQuantityOrRemoveItem,
  removeWholeItem,
  items,
  sizeProp,
}) {
  return (
    <Table>
      {(() => {
        // Group items by baseItemId and properties using reduce
        const groupedItems = cartItems.reduce((acc, itemId) => {
          const baseItemId = itemId.split('-')[0];
          const itemPropsForId = itemProps[itemId] || {};
          // Create a unique key based on baseItemId, color, and size
          const uniqueKey = `${baseItemId}-${
            itemPropsForId.color || ''
          }-${itemPropsForId.size || ''}`;

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

        // Render the grouped items
        return Object.values(groupedItems).map(
          ({ itemId, itemProps: propsForItem, quantity }) => {
            // Find the item data from the items array
            const shortSize = propsForItem.size?.split(' ')[2];
            const itemstoDisplay = items.find((i) => i._id === itemId);
            const gender =
              itemstoDisplay?.gender === '669161b8bbede0f410af829e'
                ? 'men'
                : 'women';
            //  console.log(itemstoDisplay)
            return (
              <tr key={`${itemId}-${propsForItem.color}-${propsForItem.size}`}>
                <InfoCell>
                  <ImageBox>
                    {/* Display the product image */}
                    <Image
                      width={500}
                      height={500}
                      layout="responsive"
                      src={itemstoDisplay?.images[0]}
                      alt={itemstoDisplay?.title || 'Product Image'}
                    />
                  </ImageBox>

                  <Div container>
                    <P price>
                      {/* Display the price */}${' '}
                      {itemstoDisplay?.price * propsForItem.quantity}
                    </P>
                    <P title>
                      {' '}
                      <Link href={`/${gender}/product/${itemId}`}>
                        {itemstoDisplay?.title}
                      </Link>{' '}
                    </P>

                    <P properties>
                      {/* Display color and size */}
                      {propsForItem?.color && (
                        <div className="color">{propsForItem.color}</div>
                      )}
                      <Div size>
                        <SizeSelect
                          cartSide
                          value={propsForItem.size?.split(' ')[2] || ''}
                          onChange={(ev) => {
                            const newSize = 'US Size ' + ev.target.value;
                            const uniqueId = `${itemId}-${propsForItem.color}-${newSize}`; // New uniqueId with updated size

                            const index = cartItems.findIndex(
                              (item) =>
                                item ===
                                `${itemId}-${propsForItem.color}-${propsForItem.size}`
                            );

                            if (index !== -1) {
                              // Create a new array for cartItems with the updated uniqueId
                              // console.log(cartItems)
                              const updatedCartItems = [...cartItems];
                              updatedCartItems[index] = uniqueId;

                              // console.log(
                              //   "prev cartItems:",
                              //  cartItems
                              // );
                              // Update cartItems state
                              setCartItems(updatedCartItems);
                              // console.log(
                              //   "Updated cartItems:",
                              //  updatedCartItems
                              // );
                              // Update the size in itemProps
                              setItemProps((prev) => ({
                                ...prev,
                                [uniqueId]: {
                                  ...prev[
                                    `${itemId}-${propsForItem.color}-${propsForItem.size}`
                                  ],
                                  size: newSize,
                                  quantity: propsForItem.quantity,
                                },
                              }));
                            }
                          }}
                        >
                          <option value="">Please select</option>
                          {sizeProp?.map((s) => {
                            const sizeValue = `US Size ${s.toUpperCase()}`;
                            const uniqueSizeId = `${itemId}-${propsForItem.color}-${sizeValue}`;
                            const isDisabled = cartItems.includes(uniqueSizeId);

                            return (
                              <option
                                key={s}
                                value={s.toUpperCase()}
                                disabled={isDisabled}
                                title={isDisabled ? 'item in bag' : ''}
                              >
                                {s.toUpperCase()}
                              </option>
                            );
                          })}
                        </SizeSelect>
                        <Arrow className="arrow">
                          <ArrowDropDown />
                        </Arrow>
                      </Div>
                      {/* Quantity controls */}
                      <div className="quant">
                        Qty
                        <span>{propsForItem.quantity}</span>
                        <div className="controls">
                          <ArrowDropDown
                            className="btn1"
                            style={{
                              rotate: '180deg',
                            }}
                            onClick={() => {
                              const validColor =
                                propsForItem?.color || 'defaultColor';
                              const validSize =
                                propsForItem?.size || 'defaultSize';

                              // Create a unique identifier based on itemId, color, and size
                              const uniqueId = `${itemId}-${validColor}-${validSize}`;
                              const item = items.find((i) => i._id === itemId);
                              const price = item?.price || 0;
                              setCartItems((prev) => [...prev, uniqueId]);

                              setItemProps((prevProps) => ({
                                ...prevProps,
                                [uniqueId]: {
                                  ...prevProps[uniqueId], // Preserve any existing properties
                                  quantity:
                                    (prevProps[uniqueId]?.quantity || 0) + 1, // Increment quantity, defaulting to 1 if undefined
                                  color: validColor, // Retain or set color
                                  size: validSize, // Retain or set size
                                },
                              }));
                              setTotal((prevTotal) => prevTotal + price);
                              setCLength(cartItems.length + 1);
                            }}
                          />

                          <ArrowDropDown
                            className="btn2"
                            onClick={() =>
                              handleQuantityOrRemoveItem(
                                itemId,
                                propsForItem.color,
                                propsForItem.size
                              )
                            }
                          />
                        </div>
                      </div>
                    </P>
                    <ControlBtn fav>
                      <span>
                        <FavoriteBorderOutlined />
                      </span>
                      Save for later
                    </ControlBtn>

                    <Div close>
                      {/* Remove button */}
                      <ControlBtn
                        onClick={() =>
                          removeWholeItem(
                            `${itemId}-${propsForItem.color}-${propsForItem.size}`
                          )
                        }
                      >
                        <Close style={{ height: '20px' }} />
                      </ControlBtn>
                    </Div>
                  </Div>
                </InfoCell>
              </tr>
            );
          }
        );
      })()}
    </Table>
  );
}
