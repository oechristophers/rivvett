import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import { usePathname } from 'next/navigation';
import { SkeletonItem, SkeletonLoader2 } from './ImageSkeleton';

const CatUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  text-decoration: none;
  background-color: #403f3f;
  margin: 0;
  text-transform: capitalize;
  padding-top: 6px;
  padding-bottom: 7px;
  padding-left: 30px;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    padding: 0 20px;
    background-color: white;
    gap: 30px;
    li {
      display: flex;
      justify-content: space-between;
      background-color: #e8e5e5;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      p,
      h2 {
        margin: 0;
        padding: 0;
      }
    }
  }
`;

const ImageBox = styled.div`
  width: 80px;
  height: 80px;
`;

const Button = styled(ButtonLink)`
  font-size: 0.8rem;
  letter-spacing: 1.1px;
  font-family: 'Futura Std Book';
  padding: 10px 12px;
  @media screen and (max-width: 950px) {
    color: black;
    text-transform: uppercase;
    font-family: 'Futura Std Heavy';
    letter-spacing: 1.4px;
  }
`;

const Sale = styled(ButtonLink)`
  position: relative;
  display: inline-block;
  padding: 5px 18px;
  padding-top: 7px;
  color: white;
  text-align: center;
  z-index: 1;
  span {
    display: inline-block;
    font-family: 'Futura Std Medium';
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 1.1px;
    margin-left: -7px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    margin-top: -5px;
    left: 0;
    width: 100%;
    height: 140%;
    background-color: #d01345;
    z-index: -1;
    transform: skew(-10deg);
    transform-origin: top left;
  }
`;

const cacheImages = async (srcArray) => {
  if (!srcArray.length) return;
  try {
    await Promise.all(
      srcArray.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  } catch (error) {
    console.error('Error caching images:', error);
  }
};

const CategoryList = ({ categories, activeButton,prevPath }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imageLoadingStates = new Array(categories?.length || 0).fill(false);
  const [loadedImages, setLoadedImages] = useState(imageLoadingStates);

  const pathname = usePathname();
  const path = pathname.split('/')[1] 
  // console.log(prevPath)
  // console.log(path)
  const genderId =
    path || prevPath === 'men'
      ? '669161b8bbede0f410af829e'
      : path || prevPath === 'women'
        ? '669161c1bbede0f410af82a2'
        : '';

  useEffect(() => {
    if (!categories) {
      setLoading(true);
    } else {
      setLoading(false);
      const imageUrls = categories.flatMap((category) =>
        category.posterImages.length > 1
          ? [category.posterImages[0], category.posterImages[1]]
          : [category.posterImages[0]]
      );
      cacheImages(imageUrls);
    }
  }, [categories]);

  if (error) return <p>Error: {error}</p>;

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      setAllImagesLoaded(updated.every((loaded) => loaded));
      return updated;
    });
  };

  return (
    <CatUl>
      {loading && <CatUl>&nbsp;</CatUl>}
      {activeButton ? (
        
        <>
          <li>
            <Button href="/">TRENDING</Button>
            <ImageBox>
              {' '}
              <img src="/images/facemobile.webp" alt="" />
            </ImageBox>
          </li>
          {categories && categories?.length > 0 ? (
            categories.map((category, index) => (
              <>
                <li key={category._id}>
                  <Button href={`/categories/${category._id}`}>
                    {category.name}
                  </Button>
                  <ImageBox loaded={allImagesLoaded}>
                    <img
                      src={
                        category.posterImages.length > 1
                          ? category.posterImages[
                              activeButton === 'men' ? 0 : 1
                            ]
                          : category.posterImages[0]
                      }
                      alt=""
                      onLoad={() => handleImageLoad(index)}
                    />
                  </ImageBox>
                </li>
              </>
            ))
          ) : (
            <li>Loading....</li>
          )}
          <li
            style={{
              backgroundColor: '#ccff00',
              height: '80px',
              marginBottom: '20px',
              fontFamily: 'Futura Std Heavy',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p>Sale</p>
            <b>
              <h2>Up to 60% off</h2>
            </b>
          </li>
        </>
      ) : (
        <>
          {loading && <CatUl>&nbsp;</CatUl>}
          
          <li>
            <Sale href="/">
              <span>Sale</span>
            </Sale>
          </li>
          <li>
            <Button href="/">TRENDING</Button>
          </li>
          {categories && categories?.length > 0 ? (
            categories.map((category) => (
              <>
                <li key={category._id}>
                  <Button href={`/products?category=${category._id}&gender=${genderId}`}>
                    {category.name}
                  </Button>
                </li>
              </>
            ))
          ) : (
            <SkeletonLoader2>
              {[...Array(5)].map((_, index) => (
                <SkeletonItem key={index} />
              ))}
            </SkeletonLoader2>
          )}
        </>
      )}
    </CatUl>
  );
};

export default CategoryList;
