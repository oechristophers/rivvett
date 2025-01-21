import Box from '@/components/frontend/Box';
import ProductImages from '@/components/frontend/ProductImages';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RootLayout from '@/pages/layout';
import css from 'styled-jsx/css';
import Link from 'next/link';
import Wrapper from '@/components/frontend/Wrapper';
import ProdInfo from '@/components/frontend/ProdInfo';
import { Gender } from '@/models/Gender';
import ProductCarousel from '@/components/frontend/ProductCarousel';
import ProductGrid from '@/components/frontend/ProductGrid';
import GalleryDisplay from '@/components/frontend/GalleryDisplay';
import { Gallery } from '@/models/Gallery';
import { motion } from 'framer-motion';

const ImageBox = styled(Box)`
  position: sticky;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  position: ${({ isSticky, scrollAway }) =>
    isSticky ? (scrollAway ? 'relative' : 'sticky') : 'relative'};
  top: ${({ isSticky, scrollAway }) => (isSticky && !scrollAway ? 0 : 'auto')};
  width: 100%;
  z-index: 10;
  @media screen and (max-width: 900px) {
    width: 70%;
  }
  @media screen and (max-width: 780px) {
    min-height: auto;
    width: 100%;
    position: relative;
  }
`;
const ColWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  justify-content: center;
  margin-top: 40px;
  justify-content: center;
  a,
  button {
    color: black;
  }
  @media screen and (max-width: 780px) {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 0;
    .content-scroll {
      overflow-y: hidden;
    }
    .content-scroll::-webkit-scrollbar {
      display: none;
    }
  }
  .content-scroll {
    overflow-y: scroll; /* Enable scroll */
    overflow-x: hidden;
    padding: 0 10px;
  }
  .content-scroll::-webkit-scrollbar {
    z-index: 0;
  }
`;
const Wrap = styled.div`
  padding: 0 80px;
 
  display: flex;
  flex-direction: column;

  margin-top: 40px;

  ${(props) =>
    props.carousel &&
    css`
      border-top: 1px solid #1b1a1a15;
      padding: 80px 7%;
      margin-bottom: 30px;
     
    `}
  ${(props) =>
    props.last &&
    css`
      padding-bottom: 20px;
    `}
    @media screen and (max-width: 1024px) {
    padding: 80px 5%;
    ${(props) =>
      props.grid &&
      css`
        margin-top: 0px;
      `}
  }
  @media screen and (max-width: 900px) {
    padding: 20px 10px;
  }
  @media screen and (max-width: 820px) {
    ${(props) =>
      props.grid &&
      css`
        margin-top: 10px;
      `}
    ${(props) =>
      props.carousel &&
      css`
        padding-bottom: 40px;
      `}
  }
  @media screen and (max-width: 500px) {
    ${(props) =>
      props.grid &&
      css`
        margin-top: 40px;
      `}
  }
`;
export default function ProductPage({ product, products, gallery }) {
  const [categories, setCategories] = useState([]);
  const imageBoxRef = useRef(null);
  const colWrapRef = useRef(null);
  const contentRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imageBoxElement = imageBoxRef.current;
      const contentElement = contentRef.current;

      if (!imageBoxElement || !contentElement) return;

      const imageBoxRect = imageBoxElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();

      // Check if imageBox has reached the top of the viewport
      if (imageBoxRect.top <= 0 && !scrollAway) {
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

  // console.log(gallery);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/frontend/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategories();
  }, []);
  let proCat;
  proCat = categories.find((cat) => cat._id === product.category)?.name;

  const genderName = product.gender.name;
  const femaleProducts = products.filter(
    (prod) => prod.gender.name === genderName
  );

  const relatedByShop = femaleProducts.filter((prod) => {
    const productsShops = Array.isArray(product.properties.shop)
      ? product.properties.shop
      : [product.properties.shop];
    const prodShops = Array.isArray(prod.properties.shop)
      ? prod.properties.shop
      : [prod.properties.shop];

    return productsShops.some((shop) => prodShops.includes(shop));
  });

  const related = femaleProducts.filter(
    (prod) => prod.category === product.category
  );
  const relatedByColl = femaleProducts.filter((prod) => {
    const productsColls = Array.isArray(product.properties.collection)
      ? product.properties.collection
      : [product.properties.collection];
    const prodColls = Array.isArray(prod.properties.collection)
      ? prod.properties.collection
      : [prod.properties.collection];

    return productsColls.some((coll) => prodColls.includes(coll));
  });

  
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const grow = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };
  return (
    <RootLayout>
      <Wrapper pid>
        <ColWrapper ref={colWrapRef}>
          <ImageBox
            ref={imageBoxRef}
            isSticky={isSticky}
            scrollAway={scrollAway}
            proImage
          >
            <ProductImages images={product.images} alt={product.title} />
          </ImageBox>
          <ProdInfo
            contentRef={contentRef}
            product={product}
            categories={categories}
            proCat={proCat}
          />
        </ColWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={grow}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Wrap grid>
            <ProductGrid products={related} genderName={genderName} page />
          </Wrap>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={grow}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Wrap carousel>
            <ProductCarousel
              products={relatedByShop}
              genderName={genderName}
              withGap
              hideButton
              byShop
            />{' '}
          </Wrap>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.2 }}
        >
          <GalleryDisplay gallery={gallery} isPage />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={grow}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Wrap carousel last>
            <ProductCarousel
              products={relatedByColl}
              genderName={genderName}
              withGap
              hideButton
              byColl
            />
          </Wrap>
        </motion.div>
      </Wrapper>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log(context)
  const { id } = context.query;
  const gendered = await Gender.findOne({ name: 'women' }).exec();
  const product = await Product.findById(id).populate('gender');
  const products = await Product.find({}).populate('gender');
  const gallery = await Gallery.find({ gender: gendered._id }).exec();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products)),
      gallery: JSON.parse(JSON.stringify(gallery)),
    },
  };
}
