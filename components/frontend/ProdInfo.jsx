import React, { useContext, useState } from 'react';
import Button from '@/components/frontend/Button';
import {
  ArrowDropDown,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import Truck from '@/components/frontend/icons/Truck';
import Return from '@/components/frontend/icons/Return';
import Copy from '@/components/frontend/icons/Copy';
import Accordion from '@/components/frontend/Accordion';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import css from 'styled-jsx/css';
import Link from 'next/link';
import styled from 'styled-components';
import { CartContext } from './CartContext';
import { CartB } from './ProductCard';
import { useSession } from 'next-auth/react';
import { color } from 'framer-motion';

const Div = styled.div`
  z-index: 10;
  width: 100%;
  ${(props) =>
    props.main &&
    `
      width: 320px;
      @media screen and (max-width: 780px) {
        width: auto;
        height: auto;
        padding: 0 40px;
      }
    `};
  .lastSpan {
    width: 10px;
    height: 7px;
  }
  .linkP {
    padding-left: 28px;
  }

  ${(props) =>
    props.select &&
    `
      position: relative;
      display: inline-block;
      border: 1px solid;
      margin-bottom: 20px;
    `}
  ${(props) =>
    props.info &&
    `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 10px;
      span {
        width: 22px;
        height: 15px;
      }
    `}
  ${(props) =>
    props.info &&
    props.link &&
    `
      flex-wrap: wrap;
    `}
  ${(props) =>
    props.mainInfo &&
    `
      overflow-x: hidden;
      border: 1px solid #cccc;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 20px;
      margin-top: 20px;
      p {
        margin: 0;
        padding-top: 10px;
        flex-wrap: wrap;
      }
    `}
  ${(props) =>
    props.infoLast &&
    props.info &&
    `
      border-top: 1px solid #cccc;
      padding: 10px 0;

      p {
        letter-spacing: 0.5px;
        color: #565555e6;
        text-decoration: underline;
        padding-left: 10px;
        padding-bottom: 10px;
      }
    `}
`;
const FlexBtns = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledButton = styled(Button)`
  background-color: #018849;
  font-family: 'Futura Std Bold';
  letter-spacing: 1.2px;
  font-weight: 900;
  text-transform: uppercase;
  width: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  &:hover .tooltip {
    display: ${(props) => (props.disabled ? 'block' : 'none')};
  }
`;
const Tooltip = styled.div`
  display: none;
  background-color: #000000d1;
  color: white;
  padding: 5px;
  font-size: 0.5rem;
  border-radius: 5px;
  position: absolute;
  top: -35px;
  left: 50%;
  font-family: 'Futura Std Book';
  font-weight: 100;
  z-index: 10;
`;
const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Price = styled.span`
  font-size: 1rem;
  font-family: 'Futura Std Bold';
  color: #0000008f;
`;
const P = styled.p`
  font-size: 0.7rem;
  letter-spacing: 1.2px;
  font-family: 'Futura Std Book';
  text-decoration: none;
  color: #000000d2;
  a {
    color: #000000ec;
  }
  ${(props) =>
    props.promo &&
    `
      width: 30ch;
      padding-right: 20px;
      font-size: 0.7rem;
      @media screen and (max-width: 780px) {
        width: 100%;
        padding: 20px 0;
      }
    `}
  ${(props) =>
    props.active &&
    `
      font-weight: 900;
      span {
        font-weight: 100;
      }
    `}
  ${(props) =>
    props.selects &&
    `
      font-weight: 900;
      display: flex;
      justify-content: space-between;

      span {
        font-weight: 100;
        a {
          color: black;
          font-size: 0.67rem;
        }
      }
    `}
`;
const ColorSpan = styled.button`
  background-color: ${(props) => props.color};
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;
  margin-right: 5px;
  border: 1px solid;
  cursor: pointer;
  opacity: ${(props) => (props.isFaded === false ? 0.5 : 1)};
  ${(props) =>
    props.isFaded === false &&
    `
      cursor: default;
    `}
  &:hover .note {
    visibility: visible;
  }
  ${(props) =>
    props.isFaded &&
    props.active &&
    `
      border: 2px solid;
    `}
`;
const Xmark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  letter-spacing: 1.2px;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: 'Futura Std Book';
  ${(props) =>
    props.promo &&
    `
      padding: 7px 10px;
      gap: 10px;
      line-height: 1.5;
      display: flex;
      align-items: center;
      cursor: text;
      background-color: #cde2f5;
    `}
  ${(props) =>
    props.pace &&
    `
      letter-spacing: -1.2px;
      font-weight: 900;
      font-family: 'Futura Std Heavy';
    `}
  ${(props) =>
    props.active &&
    `
      text-transform: capitalize;
    `}
  strong {
    font-weight: 900;
    font-family: 'Futura Std Medium';
  }
`;
const Note = styled.p`
  ${(props) =>
    props.tooltip &&
    `
      visibility: hidden;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 5px;
      border-radius: 3px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1;
    `}
`;
const Lines = styled.div`
  position: absolute;
  width: 2px;
  height: 120%;
  background-color: #2e2b2b; /* or any other color */
  ${(props) =>
    props.line1 &&
    `
      transform: rotate(45deg);
    `}
  ${(props) =>
    props.line2 &&
    `
      transform: rotate(-45deg);
    `}
`;
export const SizeSelect = styled.select`
  color: black;
  height: 2.4rem;
  width: 100%;
  border-radius: 0;
  border: none;
  outline: none;
  padding-left: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  ${(props) =>
    props.cartSide &&
    `
      padding-right: 0;
      width: fit-content;
      -webkit-appearance:;
      background-color: transparent;
    `}
`;
export const Arrow = styled.div`
  position: absolute;
  top: 30%;
  right: 0.25em; /* Position the arrow */
  pointer-events: none;
  transform: translateY(-50%);
  font-size: 2em;
  color: #666; /* Arrow color */
`;
const Title = styled.h1`
  font-size: 0.9rem;
  letter-spacing: 1.2px;
  margin: 0;
  width: 30ch;
  padding: 20px 0;
  padding-top: 30px;
  text-decoration: none;
  color: #000000d2;
  font-family: 'Futura Std Book';
  @media (max-width: 750px) {
    font-size: 0.85rem;
    width: fit-content;
  }
`;
export default function ProdInfo({ product, categories, proCat, contentRef }) {
  const [expanded, setExpanded] = useState(false);
  const { addItem, addFavourite } = useContext(CartContext);
  const [isSize, setIsSize] = useState(null);
  const [isColor, setIsColor] = useState(null);
  const lowerTitle = product.title.toLowerCase();
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseOver = () => {
    if (!isSize || !isColor) {
      setShowTooltip(true);
    }
  };
  const handleMouseOut = () => {
    setShowTooltip(false);
  };
  const prodCatParent = categories.find(
    (cats) =>
      cats._id ===
      categories.find((cat) => cat._id === product.category).parent,
  );
  const colorProp = prodCatParent?.properties.find(
    (prop) => prop.name === 'color',
  )?.values;
  const productColor = product?.properties?.color;

  const sizeProp = prodCatParent?.properties.find(
    (prop) => prop.name === 'size',
  )?.values;
  const productSize = product?.properties?.size;

  const accordionItems = [
    {
      title: 'Product Details',
      content: `
          • Category: ${proCat}
          ${Object.entries(product.properties)
            .filter(([key]) => key !== 'size' && key !== 'color')
            .map(([key, value]) => `• ${capitalize(key)}: ${value}`)
            .join('\n')}`,
    },
    {
      title: 'Brand',
      content: 'Rivvett designs',
    },
    {
      title: 'Size & Fit',
      content: "Model's height: 185cm/6'1\" Model is wearing: Medium",
    },
    {
      title: 'Look After Me',
      content: 'Machine wash according to instructions on care labels',
    },
    {
      title: 'About Me',
      content: product.description,
    },
  ];
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleAccordionChange = (isExpanded) => (event, expanded) => {
    setExpanded(isExpanded ? isExpanded : false);
  };

  return (
    <Div ref={contentRef} className="content-scroll" main>
      <Title>RIVETT DESIGN {lowerTitle}</Title>
      {/* {product.description && <p>{product.description}</p>} */}
      <PriceRow>
        <Price> ${product.price}</Price>
        <P>
          OR Pay in 4 payments of ${product.price / 4} with{' '}
          <Span pace>PACEPAY.</Span>
        </P>
        <div className="flex flex-col gap-3">
          <Span promo>
            <SellOutlinedIcon
              style={{ transform: 'rotate(90deg)' }}
              className="md:mb-[23px]"
            />
            <P promo>
              NEW HERE? Get 10% off selected styles!* With code:{' '}
              <strong>NEWBIE</strong>{' '}
            </P>
          </Span>
          <Span>
            <P active>
              Color: <Span active>{isColor}</Span>{' '}
            </P>
            {colorProp?.map((color, index) => {
              const isColorInParent = productColor?.some((col) =>
                col.includes(color),
              );
              return (
                <ColorSpan
                  onClick={() =>
                    isColorInParent === true
                      ? setIsColor(color)
                      : setIsColor(null)
                  }
                  active={isColor === color}
                  key={index}
                  color={color}
                  isFaded={isColorInParent === true}
                >
                  &nbsp;
                  {!isColorInParent && (
                    <>
                      <Xmark>
                        <Lines line1></Lines>
                        <Lines line2></Lines>
                      </Xmark>
                      <Note tooltip className="note">
                        Not Available
                      </Note>
                    </>
                  )}
                </ColorSpan>
              );
            })}
          </Span>
          <Span>
            <P selects>
              Size:{' '}
              <Span>
                <Link href={'#'}>Size Guide</Link>
              </Span>
            </P>
            <Div select>
              <SizeSelect
                value={isSize}
                onChange={(ev) => setIsSize(ev.target.value)}
              >
                <option value="">Please select</option>
                {sizeProp?.length > 0 &&
                  sizeProp.map((s, i) => (
                    <option
                      key={i}
                      value={`US Size ${s.toUpperCase()}`}
                    >{`US Size ${s.toUpperCase()}`}</option>
                  ))}
              </SizeSelect>
              <Arrow>
                <ArrowDropDown />
              </Arrow>
            </Div>
          </Span>
          <FlexBtns>
            <StyledButton
              primary
              onClick={() => addItem(product._id, isColor, isSize)}
              disabled={!isSize || !isColor}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ opacity: isSize && isColor ? 1 : 0.4, color: 'white' }}
            >
              {' '}
              Add to bag{' '}
              {(!isSize || !isColor) && (
                <Tooltip className="tooltip">
                  {' '}
                  You must select color and size before adding to the bag{' '}
                </Tooltip>
              )}{' '}
            </StyledButton>

            <CartB
              inId
              onClick={() => addFavourite(product._id, isColor, isSize)}
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
          </FlexBtns>
          <Div mainInfo>
            <Div info>
              <Span>
                <Truck />
              </Span>
              <P> Free shipping on qualifying orders.</P>{' '}
            </Div>
            <Div info>
              <Span>
                <Return />
              </Span>
              <P> Free returns on qualifying orders.</P>{' '}
            </Div>
            <Div info link>
              <P className="linkP">
                {' '}
                <Link href={'/'}>View our Delivery & Returns Policy</Link>
              </P>{' '}
              <Span
                className="lastSpan"
                style={{ width: '10px', height: '10px', fontSize: '5px' }}
              >
                <Copy />
              </Span>
            </Div>
            <Div info infoLast>
              <P> This product has no shipping restrictions.</P>{' '}
            </Div>
          </Div>

          <Div>
            <Accordion items={accordionItems} />
          </Div>
        </div>
      </PriceRow>
    </Div>
  );
}
