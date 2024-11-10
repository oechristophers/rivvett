import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartBag from "@/components/icons/CartBag";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";
import { Category } from "@/models/Category";
import { Arrow, SizeSelect } from "@/components/ProdInfo";
import FooterIcons from "@/components/FooterIcons";
import Footer from "@/components/Footer";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Close,
  DirectionsBus,
  ExpandLess,
  ExpandMore,
  FavoriteBorderOutlined,
  Speed,
} from "@mui/icons-material";
import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/models/Product";
import { Gender } from "@/models/Gender";
import Layout from "./layout";

const ColumnWrapper = styled.div`
  display: flex;
  padding: 0 15px;
  position: relative;
  gap: 10px;
  justify-content: center;
  margin-top: 40px;
  justify-content: center;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;
const ItemWrap = styled.div`
  display: grid;
  gap: 10px;

  grid-template-columns: 1fr;
  grid-template-areas:
    "a"
    "b"
    "c"
    "e"
    "f"
    "g";
  @media screen and (max-width: 1024px) {
    width: 72%;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const Title = styled.h2`
  font-family: "Futura Std Heavy";
  letter-spacing: 2px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1rem;
`;
const PButton = styled(Button)`
  background: #000;
  display: block;
  width: 100%;
  ${(props) =>
    props.empty &&
    css`
      background-color: #018849;
      display: flex;
      width: fit-content;
      margin: 0 auto;
      text-transform: uppercase;
      color: white;
      font-weight: bolder;
      letter-spacing: 1px;
    `}
  ${(props) =>
    props.shopmore &&
    css`
      background-color: transparent;
      text-decoration: underline;
      margin-top: 5px;
    `}
`;

const ControlBtn = styled(Button)`
  background-color: transparent;
  align-items: center;

  ${(props) =>
    props.fav &&
    css`
      padding: 5px;
      padding-right: 12px;
      padding-left: 0;
      float: left;

      border: 1px solid;
    `}

  span {
    transform: translateX(5px);
    margin: 0;
  }
`;

const InfoCell = styled.td`
  display: grid;
  position: relative;
  grid-template-columns: 0.2fr 1.8fr;
  img {
    min-width: 100%;
    max-height: 8rem;
  }
  .shipping {
    width: 40ch;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  .expandMore {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    cursor: pointer;
  }
  .shipDiv {
    display: flex;
    flex-direction: column;
    gap: 0;
    transition: all 0.3s ease;
  }
  .title {
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .shipBtn {
    margin-top: 20px;
    padding: 5px 50px;
    text-transform: uppercase;
    font-family: "Futura Std Heavy";
    letter-spacing: 1.5px;
    background-color: transparent;
    border: 2px solid green;
    width: fit-content;
    cursor: pointer;
  }
`;

const ImageBox = styled.div`
  width: 6rem;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .shipping {
    max-width: 70%;
    min-width: 20%;
  }
`;
const ExpandMoreIcon = styled(ExpandMore)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};
`;
const ExpandableDiv = styled.div`
  max-height: ${(props) => (props.expanded ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.8s ease, opacity 0.3s ease;
  opacity: ${(props) => (props.expanded ? "1" : "0")};
`;
const Div = styled.div`
  margin-left: 10px;
  .arrow {
    margin: 0;
    margin-top: 2px;
    margin-right: 20px;
  }
  ${(props) =>
    props.total &&
    css`
      display: flex;
      justify-content: space-between;
    `}
  ${(props) =>
    props.close &&
    css`
      position: absolute;
      top: 0;
      right: 0;
      margin-right: -20px;
    `}
  ${(props) =>
    props.container &&
    css`
      position: relative;
    `}
  ${(props) =>
    props.size &&
    css`
      width: fit-content;
      margin-left: 0;
      position: relative;
      display: inline-block;
    `}
`;
const P = styled.p`
  text-align: left;
  .quant {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .color {
    width: fit-content;
    display: flex;
    padding-right: 10px;
    text-transform: capitalize;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 0;

    .btn1,
    .btn2 {
      padding: 0;
      margin: 0;
      line-height: 1;
      height: 20px;
      cursor: pointer;
    }

    .btn1 {
      transform: translateY(-3px); /* Adjust to bring it closer to btn2 */
    }
    .btn2 {
      transform: translateY(-6px); /* Adjust to bring it closer to btn1 */
    }
  }

  ${(props) =>
    props.empty &&
    `
    text-align:center;
    width:100%;
    max-width:35ch;
    display:flex;
    margin:0 auto;
    padding-bottom:20px;
  `}
  ${(props) =>
    props.delivery &&
    css`
      font-size: 0.8rem;
      font-family: "Futura Std Book";
      letter-spacing: 0.5px;
      padding-left: 3px;
      text-align: center;
    `}
    ${(props) =>
    props.total &&
    css`
      font-family: "Futura Std Heavy";
      font-size: 0.8rem;
      letter-spacing: 1px;
      padding: 20px;
    `}
    ${(props) =>
    props.small &&
    css`
      font-family: "Futura Std Book";
      font-size: 0.8rem;
      letter-spacing: 0.5px;
    `}
    ${(props) =>
    props.properties &&
    css`
      display: flex;
      align-items: center;
      font-family: "Futura Std Book";
      font-weight: 100;
      margin: 0;
      font-size: 0.8rem;
      letter-spacing: 1.2px;
    `}
    ${(props) =>
    props.price &&
    css`
      font-size: 0.9rem;
      font-family: "Futura Std Bold";
      color: #0000008f;
    `}
    ${(props) =>
    props.title &&
    css`
      font-size: 0.8rem;
      letter-spacing: 1.2px;
      margin: 0;
      text-decoration: none;
      color: #000000d2;
      font-family: "Futura Std Book";
      @media (max-width: 750px) {
        font-size: 0.85rem;
      }
    `}
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const Span = styled.span`
  color: black;
  margin: 0;
  ${(props) =>
    props.delivery &&
    css`
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-weight: 100;
      font-family: "Futura Std Bold";
      font-size: 0.8rem;
    `}
  img {
    width: 1.5rem;
    height: 1.5rem;
    z-index: 100;
    margin-left: 20px;
  }
`;
const H4 = styled.h4`
  font-family: "Futura Std Bold";
  letter-spacing: 2.3px;
  font-weight: 900;
`;
export default function CartPage({ categories, products }) {
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
  const [items, setItems] = useState([]);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [total, setTotal] = useState(0);

  const itemWrapRef = useRef(null);
  const contentRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const itemWrapElement = itemWrapRef.current;
      const contentElement = contentRef.current;

      if (!itemWrapElement || !contentElement) return;

      const itemWrapRect = itemWrapElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();

      // Check if itemWrap has reached the top of the viewport
      if (itemWrapRect.top <= 0 && !scrollAway) {
        setIsSticky(true);
      } else if (contentRect.bottom <= window.innerHeight) {
        // Check if contentRef has reached the end
        setScrollAway(true);
        setIsSticky(false);
      } else {
        setScrollAway(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollAway]);

  const casrouselP = products.filter(
    (product) => product.gender.name === "men"
  );
  const calculateTotal = (cartItems, items, itemProps) => {
    let total = 0; // Initialize total to 0
    cartItems.forEach((itemId) => {
      const itemBaseId = itemId.split("-")[0];
      const item = items.find((i) => i._id === itemBaseId);
      const propForIdQuant = itemProps[itemId]?.quantity || 0; // Default to 0 if undefined
      const price = item?.price || 0;
      total += (price * propForIdQuant) / propForIdQuant; // Accumulate total
    });
    return total; // Return the final total
  };
  const tots = calculateTotal(cartItems, items, itemProps);
  useEffect(() => {
    setTotal(tots);
  }, [tots, setTotal]); // Ensure setTotal is in the dependency array

  useEffect(() => {
    const itemIds = cartItems.map((item) => item.split("-")[0]);
    // console.log(itemIds);
    if (cartItems.length > 0) {
      axios
        .post(`/api/cart`, { ids: itemIds })
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    } else {
      setItems([]);
    }
  }, [cartItems]);

  <ArrowDropDown
  className="btn2"
  onClick={() => handleQuantityOrRemoveItem(itemId, propsForItem.color, propsForItem.size)}
/>

// Helper functions outside of the component
const handleQuantityOrRemoveItem = (itemId, color, size) => {
  const uniqueId = `${itemId}-${color}-${size}`;
  const item = items.find((i) => i._id === itemId);
  const price = item?.price || 0;
  const currentQuantity = itemProps[uniqueId]?.quantity || 0; // Default to 0 if undefined

  if (currentQuantity > 1) {
    // Reduce quantity if greater than 1
    reduceQuantity(uniqueId, price);
  } else if (currentQuantity === 1) {
    // Remove item if quantity is 1
    removeOne(uniqueId);
  } else if (currentQuantity === 0) {
    // If current quantity is 0, delete props and remove from cart
    deleteItemFromCart(uniqueId);
  }
};

const reduceQuantity = (uniqueId, price) => {
  // Update itemProps to reduce the quantity
  setItemProps((prevProps) => ({
    ...prevProps,
    [uniqueId]: {
      ...prevProps[uniqueId],
      quantity: prevProps[uniqueId].quantity - 1,
    },
  }));

  // Update total price and cart length
  setTotal((prevTotal) => prevTotal - price);
  setCLength((prevLength) => prevLength - 1);

  // Remove one instance of the uniqueId from cartItems
  setCartItems((prevCartItems) => {
    const index = prevCartItems.indexOf(uniqueId);
    if (index > -1) {
      const updatedCart = [...prevCartItems];
      updatedCart.splice(index, 1); // Remove one instance of uniqueId
      return updatedCart;
    }
    return prevCartItems;
  });

  // Sync with localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const removeOne = (uniqueId) => {
  setItemProps((prevProps) => {
    const updatedProps = { ...prevProps };
    delete updatedProps[uniqueId];
    return updatedProps;
  });

  const updatedCart = cartItems.filter((item) => item !== uniqueId);
  setCartItems(updatedCart);
  setCLength(updatedCart.length);

  // Sync with localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

const deleteItemFromCart = (uniqueId) => {
  setItemProps((prevProps) => {
    const updatedProps = { ...prevProps };
    delete updatedProps[uniqueId];
    return updatedProps;
  });

  const updatedCart = cartItems.filter((item) => item !== uniqueId);
  setCartItems(updatedCart);
  setCLength(updatedCart.length);

  // Sync with localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};


  //for product props selection
  let product = null;
  for (const itemId of cartItems) {
    const itemBaseId = itemId.split("-")[0];
    const prod = items.find((i) => i._id === itemBaseId);
    product = prod;
  }
  // console.log(cartItems);

  const prodCatParent = categories.find(
    (cats) =>
      cats._id ===
      categories.find((cat) => cat._id === product?.category)?.parent
  );
  const sizeProp = prodCatParent?.properties.find(
    (prop) => prop.name === "size"
  )?.values;
  const productSize = product?.properties?.size;

  //checkout button logic
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartItems,
      itemProps,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        window.location = window.location.href.replace("?success=1", "");
      }, 5000);
      clearCart();
    }
  }, []);
  if (isSuccess) {
    return (
      <Layout>
        <Header />
        <Center>
          <ColumnWrapper>
            <Box empty>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnWrapper>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      {total > 170 && (
        <Box delivery>
          <Span>
            <img src="/icons8-confetti-48.png" alt="" />
          </Span>
          <P delivery>
            <Span delivery>Free delivery on this order </Span>Congrats, you get
            FREE Standard Shipping to your location for spending over $70.00!
          </P>
        </Box>
      )}

      {!items?.length && (
        <Center>
          <Span>
            <CartBag />
          </Span>
          <H4>Your bag is empty</H4>
          <P empty>
            Items remain in your bag for 60 minutes, and then they're moved to
            your Saved Items.
          </P>
          <PButton empty>View saved items</PButton>

          <PButton shopmore> Continue Shopping</PButton>
        </Center>
      )}
      <ColumnWrapper
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {cartItems?.length > 0 && (
          <ItemWrap
            ref={contentRef}
            style={{
              minHeight: "100vh", // To ensure there's enough content to scroll
            }}
            className="content-scroll"
          >
            <Box small>
              {" "}
              <Title>My Bag</Title>
              <P small>Items are reserved for 60 minutes</P>
            </Box>
            <Box bgrid>
              <Table>
                {(() => {
                  // Group items by baseItemId and properties using reduce
                  const groupedItems = cartItems.reduce((acc, itemId) => {
                    const baseItemId = itemId.split("-")[0];
                    const itemPropsForId = itemProps[itemId] || {};
                    // Create a unique key based on baseItemId, color, and size
                    const uniqueKey = `${baseItemId}-${
                      itemPropsForId.color || ""
                    }-${itemPropsForId.size || ""}`;

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
                      const shortSize = propsForItem.size?.split(" ")[2];
                      const itemstoDisplay = items.find(
                        (i) => i._id === itemId
                      );
                      //  console.log(itemstoDisplay)
                      return (
                        <tr
                          key={`${itemId}-${propsForItem.color}-${propsForItem.size}`}
                        >
                          <InfoCell>
                            <ImageBox>
                              {/* Display the product image */}
                              <img
                                src={itemstoDisplay?.images[0]}
                                alt={itemstoDisplay?.title || "Product Image"}
                              />
                            </ImageBox>

                            <Div container>
                              <P price>
                                {/* Display the price */}${" "}
                                {itemstoDisplay?.price * propsForItem.quantity}
                              </P>
                              <P title>{itemstoDisplay?.title}</P>

                              <P properties>
                                {/* Display color and size */}
                                {propsForItem?.color && (
                                  <div className="color">
                                    {propsForItem.color}
                                  </div>
                                )}
                                <Div size>
                                  <SizeSelect
                                    cartSide
                                    value={
                                      propsForItem.size?.split(" ")[2] || ""
                                    }
                                    onChange={(ev) => {
                                      const newSize =
                                        "US Size " + ev.target.value;
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
                                      const isDisabled =
                                        cartItems.includes(uniqueSizeId);

                                      return (
                                        <option
                                          key={s}
                                          value={s.toUpperCase()}
                                          disabled={isDisabled}
                                          title={
                                            isDisabled ? "item in bag" : ""
                                          }
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
                                        rotate: "180deg",
                                      }}
                                      onClick={() => {
                                        const validColor =
                                          propsForItem?.color || "defaultColor";
                                        const validSize =
                                          propsForItem?.size || "defaultSize";

                                        // Create a unique identifier based on itemId, color, and size
                                        const uniqueId = `${itemId}-${validColor}-${validSize}`;
                                        const item = items.find(
                                          (i) => i._id === itemId
                                        );
                                        const price = item?.price || 0;
                                        setCartItems((prev) => [
                                          ...prev,
                                          uniqueId,
                                        ]);

                                        setItemProps((prevProps) => ({
                                          ...prevProps,
                                          [uniqueId]: {
                                            ...prevProps[uniqueId], // Preserve any existing properties
                                            quantity:
                                              (prevProps[uniqueId]?.quantity ||
                                                0) + 1, // Increment quantity, defaulting to 1 if undefined
                                            color: validColor, // Retain or set color
                                            size: validSize, // Retain or set size
                                          },
                                        }));
                                        setTotal(
                                          (prevTotal) => prevTotal + price
                                        );
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
                                  <Close style={{ height: "20px" }} />
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
            </Box>
            <Box egrid>
              <Div total>
                <span></span>
                <Div total>
                  <P total>SUB-TOTAL</P>&nbsp;
                  <P total>${total}</P>
                </Div>
              </Div>
            </Box>
            <Box cgrid>
              <InfoCell>
                <ImageBox>
                  {/* Display the product image */}
                  <img
                    src={"/images/shipping.png"}
                    alt={"shipping"}
                    className="shipping"
                  />
                </ImageBox>
                <Div className="shipDiv">
                  <Title className="title">RIVVETT Premier USA</Title>&nbsp;
                  <P title className="shipping">
                    Enjoy unlimited Express Delivery on all orders of $50+ and
                    Standard Shipping on all others over $20 for a whole year
                    for only $19.99! Ts&Cs apply.
                  </P>
                  <Button className="shipBtn">Add to bag</Button>
                </Div>
                <ExpandMoreIcon
                  className="expandMore"
                  expanded={expanded}
                  style={{}}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                />
              </InfoCell>
              <ExpandableDiv expanded={expanded} className="shipDiv">
                <P title className="shipping">
                  Sign up to RIVETT Premier USA for unlimited Express Delivery
                  on orders of $50+ (plus, Standard Shipping on all others over
                  $20!) for a whole year. Say hello to speedy, hassle-free
                  shopping!
                </P>
                <Title className="title">Only $19.99 for 12 months</Title>
                <P title className="shipping">
                  By signing up, you're agreeing to these terms and conditions.
                  *Cut-off times and dates, and postcode restrictions apply.
                </P>
                <br />
              </ExpandableDiv>
            </Box>
            <Box fgrid>
              <ProductCarousel
                inCart
                hideButton
                genderName={"men"}
                products={casrouselP}
              />
              {/* <>{items.map((item)=> item.gender)}</> */}
            </Box>
            <Box ggrid>
              {/* <img src="/fast-delivery.png" alt="" /> */}
              <Div className="shipDiv2">
                <Title className="title">Free* standard shipping</Title>&nbsp;
                <P title className="shipping">
                  Faster delivery options available to most countries
                </P>
                <a className="shipBtn">More info</a>
              </Div>
              {/* <>{items.map((item)=> item.gender)}</> */}
            </Box>
          </ItemWrap>
        )}
        {!!cartItems.length && (
          <Box
            dgrid
            ref={itemWrapRef}
            style={{
              position: isSticky
                ? scrollAway
                  ? "relative"
                  : "sticky"
                : "relative",
              top: isSticky && !scrollAway ? 0 : "auto",
              width: "100%",
              zIndex: 10,
            }}
          >
            <h2>Order Information</h2>

            <Input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <CityHolder>
              <Input
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </CityHolder>
            <Input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Country"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <PButton white outline onClick={goToPayment}>
              Continue to Payment
            </PButton>
          </Box>
        )}
      </ColumnWrapper>
    </Layout>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find({}).exec();
  const products = await Product.find({}).populate("gender");
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
