import Box from '@/components/frontend/Box';
import { CartContext } from '@/components/frontend/CartContext';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Category } from '@/models/Category';
import { motion } from 'framer-motion';
import ProductCarousel from '@/components/frontend/ProductCarousel';
import { Product } from '@/models/Product';
import { Gender } from '@/models/Gender';
import RootLayout from './layout';
import { UseIsDevice } from '@/components/frontend/DeviceView';
import Link from 'next/link';
import OrderSuccess from '@/components/frontend/cart/Success';
import Promotion from '@/components/frontend/cart/Promotion';
import EmptyBag from '@/components/frontend/cart/EmptyBag';
import ColumnWrapper from '@/components/frontend/cart/ColumnWrapper';
import Premium from '@/components/frontend/cart/Premium';
import CheckoutForm from '@/components/frontend/cart/CheckoutForm';
import CartTable from '@/components/frontend/cart/CartTable';
import Title from '@/components/frontend/cart/Title';
import P from '@/components/frontend/cart/Paragraph';
import Div from '@/components/frontend/cart/Div';
import Spinner from '@/components/frontend/Spinner';

const ItemWrap = styled.div`
  display: grid;
  gap: 10px;

  grid-template-columns: 1fr;
  grid-template-areas:
    'a'
    'b'
    'c'
    'e'
    'f'
    'g';
  @media screen and (max-width: 1024px) {
    width: 72%;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [total, setTotal] = useState(0);
  const { isNavView } = UseIsDevice();
  const itemWrapRef = useRef(null);
  const contentRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const grow = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

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

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollAway]);

  const casrouselP = products.filter(
    (product) => product.gender.name === 'men'
  );
  const calculateTotal = (cartItems, items, itemProps) => {
    let total = 0; // Initialize total to 0
    cartItems.forEach((itemId) => {
      const itemBaseId = itemId.split('-')[0];
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
    const itemIds = cartItems.map((item) => item.split('-')[0]);

    if (cartItems.length > 0) {
      setLoading(true); // Start loading
      axios
        .post(`/api/frontend/cart`, { ids: itemIds })
        .then((response) => {
          setItems(response.data);
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          console.error('Error fetching cart data:', error);
          setLoading(false); // Stop loading even on error
        });
    } else {
      setItems([]);
      setLoading(false); // Stop loading if no cart items
    }
  }, [cartItems]);

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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
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
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  //for product props selection
  let product = null;
  for (const itemId of cartItems) {
    const itemBaseId = itemId.split('-')[0];
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
    (prop) => prop.name === 'size'
  )?.values;
  const productSize = product?.properties?.size;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        window.location = window.location.href.replace('?success=1', '');
      }, 5000);
      clearCart();
    }
  }, [clearCart]);

  if (loading) {
    return (
      <RootLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </RootLayout>
    );
  }

  if (isSuccess) {
    return <OrderSuccess />;
  }

  return (
    <RootLayout>
      {total > 10 && <Promotion />}

      {!items?.length && <EmptyBag />}
      <ColumnWrapper>
        {cartItems?.length > 0 && (
          <ItemWrap
            ref={contentRef}
            style={{
              minHeight: '100vh',
            }}
            className="content-scroll"
          >
            <Box small>
              <Title>My Bag</Title>
              <P small>Items are reserved for 60 minutes</P>
            </Box>
            <Box bgrid>
              <CartTable
                cartItems={cartItems}
                setCLength={setCLength}
                setCartItems={setCartItems}
                setItemProps={setItemProps}
                setTotal={setTotal}
                itemProps={itemProps}
                removeWholeItem={removeWholeItem}
                handleQuantityOrRemoveItem={handleQuantityOrRemoveItem}
                items={items}
                sizeProp={sizeProp}
              />
            </Box>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box egrid>
                <Div total>
                  <span></span>
                  <Div total>
                    <P total>SUB-TOTAL</P>&nbsp;
                    <P total>${total}</P>
                  </Div>
                </Div>
              </Box>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Premium expanded={expanded} setExpanded={setExpanded} />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box fgrid>
                <ProductCarousel
                  inCart
                  hideButton
                  genderName={'men'}
                  products={casrouselP}
                />
              </Box>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box ggrid>
                <Div className="shipDiv2">
                  <Title className="title">Free* standard shipping</Title>&nbsp;
                  <P title className="shipping">
                    Faster delivery options available to most countries
                  </P>
                  <a className="shipBtn">More info</a>
                </Div>
              </Box>
            </motion.div>
          </ItemWrap>
        )}
        {!!cartItems.length && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={isNavView && fadeInFromRight}
            viewport={{ once: true, amount: 0.2 }}
            ref={itemWrapRef}
            style={{
              position: isSticky
                ? scrollAway
                  ? 'relative'
                  : 'sticky'
                : 'relative',
              top: isSticky && !scrollAway ? 0 : 'auto',
              zIndex: 10,
            }}
          >
            <CheckoutForm cartItems={cartItems} />
          </motion.div>
        )}
      </ColumnWrapper>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find({}).exec();
  const products = await Product.find({}).populate('gender');
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
