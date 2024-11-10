// CategoryList.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonLink from "./ButtonLink";
import { useRouter } from "next/router";

const CatUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  text-decoration: none;
  background-color: #403f3f;
  margin: 0;
  text-transform: capitalize;
  padding-top: 5px;
  padding-bottom: 5px;
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
  font-family: "Futura Std Book";
  padding: 10px 12px;
  @media screen and (max-width: 950px) {
    color: black;
    text-transform: uppercase;
    font-family: "Futura Std Heavy";
    letter-spacing: 1.4px;
  }
`;
const Sale = styled(ButtonLink)`
  position: relative;

  display: inline-block;
  padding: 10px 18px;
  color: white;
  text-align: center;
  z-index: 1;
  /* Ensure the text is not slanted */
  span {
    display: inline-block;
    font-family: "Futura Std Medium";
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 1.1px;
    margin-left: -7px;
    /* transform: skew(7deg); Reverse the skew of the parent to counterbalance the effect */
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    margin-top: -5px;
    left: 0;
    width: 100%;
    height: 125%;
    background-color: #d01345;
    z-index: -1; /* Push the background behind the content */
    transform: skew(-10deg); /* Slant the background */
    transform-origin: top left;
  }
`;

const CategoryList = ({ categories, activeButton }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imageLoadingStates = new Array(categories?.length || 0).fill(false);
  const [loadedImages, setLoadedImages] = useState(imageLoadingStates);

  const router = useRouter();
  const path = router.pathname.split("/")[1];
  useEffect(() => {
    if (!categories) {
      setLoading(true); // Set loading to true if categories is falsy
    } else {
      setLoading(false); // Set loading to false when categories is truthy
    }
  }, [categories]);
  if (error) return <p>Error: {error}</p>;

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      // Check if all images are now loaded
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
              {" "}
              <img src="/images/facemobile.webp" alt="" />
            </ImageBox>
          </li>
          {categories && categories?.length > 0 ? (
            categories.map((category) => (
              <>
                <li key={category._id}>
                  <Button href={`/categories/${category._id}`}>
                    {category.name}
                  </Button>
                  <ImageBox loaded={allImagesLoaded}>
                  <img
                    src={
                      category.posterImages.length > 1
                        ? category.posterImages[activeButton === "men" ? 0 : 1]
                        : category.posterImages[0]
                    }
                    alt=""
                    onLoad={() => handleImageLoad(category._id)}
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
              backgroundColor: "#ccff00",
              height: "80px",
              marginBottom: "20px",
              fontFamily: "Futura Std Heavy",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
                  <Button href={`/categories/${category._id}`}>
                    {category.name}
                  </Button>
                </li>
              </>
            ))
          ) : (
            <li>Loading....</li>
          )}{" "}
        </>
      )}
    </CatUl>
    // {activeButton? (

    // ):()}
  );
};

export default CategoryList;
