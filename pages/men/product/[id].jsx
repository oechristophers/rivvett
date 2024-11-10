import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Layout from "../../layout";
import css from "styled-jsx/css";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import ProdInfo from "@/components/ProdInfo";
import { Gender } from "@/models/Gender";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import GalleryDisplay from "@/components/GalleryDisplay";
import { Gallery } from "@/models/Gallery";

const ImageBox = styled(Box)`
  position: sticky;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  position: ${({ isSticky, scrollAway }) =>
    isSticky ? (scrollAway ? "relative" : "sticky") : "relative"};
  top: ${({ isSticky, scrollAway }) => (isSticky && !scrollAway ? 0 : "auto")};
  width: 100%;
  z-index: 10;
  @media screen and (max-width: 900px) {
    width: 70%;
  }
  @media screen and (max-width: 780px) {
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
  border-top: 1px solid #1b1a1a15;
  margin-top: 40px;
  ${(props) =>
    props.carousel &&
    css`
      padding: 80px 160px;
      margin-bottom: 30px;
    `}
  ${(props) =>
    props.last &&
    css`
      padding-bottom: 20px;
    `}
    @media screen and (max-width: 780px) {
    padding: 0;
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

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollAway]);

  // console.log(gallery);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
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
  const maleProducts = products.filter(
    (prod) => prod.gender.name === genderName
  );

  const relatedByShop = maleProducts.filter((prod) => {
    const productsShops = Array.isArray(product.properties.shop)
      ? product.properties.shop
      : [product.properties.shop];
    const prodShops = Array.isArray(prod.properties.shop)
      ? prod.properties.shop
      : [prod.properties.shop];

    return productsShops.some((shop) => prodShops.includes(shop));
  });

  const related = maleProducts.filter(
    (prod) => prod.category === product.category
  );
  const relatedByColl = maleProducts.filter((prod) => {
    const productsColls = Array.isArray(product.properties.collection)
      ? product.properties.collection
      : [product.properties.collection];
    const prodColls = Array.isArray(prod.properties.collection)
      ? prod.properties.collection
      : [prod.properties.collection];

    return productsColls.some((coll) => prodColls.includes(coll));
  });

  //console.log(relatedByShop.length);
  // console.log(proCat);
  // console.log(categories);

  // Check if the product's color is in the parent category's colors

  // console.log('Product Color:', productSize);
  // console.log('Color Prop:', colorProp);
  // console.log(isSize)
  return (
    <Layout>
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
        <Wrap>
          <ProductGrid products={related} genderName={genderName} page />
        </Wrap>
        <Wrap carousel>
          <ProductCarousel
            products={relatedByShop}
            genderName={genderName}
            withGap
            hideButton
            byShop
          />
        </Wrap>
        <GalleryDisplay gallery={gallery} isPage />
        <Wrap carousel last>
          <ProductCarousel
            products={relatedByColl}
            genderName={genderName}
            withGap
            hideButton
            byColl
          />
        </Wrap>
      </Wrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log(context)
  const { id } = context.query;
  const product = await Product.findById(id).populate("gender");
  const products = await Product.find({}).populate("gender");
  const gallery = await Gallery.find({ gender: product.gender._id }).exec();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products)),
      gallery: JSON.parse(JSON.stringify(gallery)),
    },
  };
}
