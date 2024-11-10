import styled, { keyframes } from "styled-components";
import SearchIcon from "./icons/SearchIcon";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import css from "styled-jsx/css";
import { UseIsDevice } from "./DeviceView";
import { Close } from "@mui/icons-material";

const Wrap = styled.div`
  position: relative;
  /* ${(props) =>
    props.showInput &&
    css`
      position: absolute;
    `} */
`;
const SearchButton = styled.button`
  margin-right: 0;
  position: absolute;
  left: 93%;
  cursor: pointer;
  padding: 7px 0;
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;

  @media screen and (max-width: 800px) {
    left: ${({ showInput }) => (showInput ? "90%" : "96%")};
    color: ${({ showInput }) => (showInput ? "#000" : "#fff")};
  }
`;

const Div = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  ${(props) =>
    props.showInput &&
    css`
      position: relative;
    `}
  z-index: 1000;
  margin-top: 60px;
  width: 96%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 10px;

  li {
    list-style: none;
    font-family: "Futura Std Book";
    letter-spacing: 1.2px;
    font-size: 0.8rem;
    padding: 5px 0;
  }
`;

const Sect = styled.div`
  @media screen and (max-width: 800px) {
    padding-top: 10px;

    input {
      display: none;
      ${(props) =>
        props.showInput &&
        css`
          width: 100vw;
          display: block;
        `}
    }
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled loader component
const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid black;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;
  margin: 20px auto;

  // "R" text in the center
  &:before {
    content: "R";
    position: absolute;
    font-family: 'Futura Std Bold', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
  }
`;
const highlightMatch = (text, query) => {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    )
  );
};

export default function Search({
  data,
  showResults,
  setShowResults,
  showInput,
  setShowInput,
}) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const { higherMobile } = UseIsDevice();
  const [filteredData, setFilteredData] = useState({
    products: [],
    categories: [],
    blogs: [],
    shops: [],
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length < 1) {
      setMessage("");
      setShowResults(false);
      return;
    }
    if (value.trim().length > 0 && value.trim().length < 2) {
      setMessage("Enter at least two characters to search");
      setShowResults(true);
      return;
    }
    if (value.trim() && value.trim().length > 1) {
      setMessage("");
      const products = data.filter(
        (item) =>
          item.type === "product" &&
          item.title.toLowerCase().includes(value.toLowerCase())
      );
      const categories = data.filter(
        (item) =>
          item.type === "category" &&
          item.name.toLowerCase().includes(value.toLowerCase())
      );
      const blogs = data.filter(
        (item) =>
          item.type === "blog" &&
          item.title.toLowerCase().includes(value.toLowerCase())
      );
      const shops = data.filter(
        (item) =>
          item.type === "shop" &&
          item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData({ products, categories, blogs, shops });
      setShowResults(true);
    } else {
      setFilteredData({ products: [], categories: [], blogs: [], shops: [] });
    }
  };
  // console.log(showInput)
  //
  return (
    <Wrap className="Scontain" showInput={showInput}>
      <Sect className="flexed" showInput={showInput}>
        {!higherMobile ? (
          <Input
            search
            value={query}
            onChange={handleSearch}
            placeholder="Search for items and categories"
            onFocus={() => setShowResults(true)}
          />
        ) : (
          <Input
            search
            value={query}
            onChange={handleSearch}
            placeholder="Search for items and categories"
            showInput={showInput}
          />
        )}
        {higherMobile ? (
          <SearchButton
            onClick={() => setShowInput(true)}
            showInput={showInput}
          >
            <SearchIcon />
          </SearchButton>
        ) : (
          <SearchButton type="submit" className="btn">
            <SearchIcon />
          </SearchButton>
        )}
      </Sect>
      {query.length > 0 && message && showResults && (
        <Div className="search-results">
          <Loader />

          <Close
            onClick={() => {
              setShowInput(!true);
              setShowResults(!showResults);
            }}
          />
        </Div>
      )}
      {((query.length > 1 && filteredData.products.length > 0) ||
        filteredData.categories.length > 0 ||
        filteredData.blogs.length > 0 ||
        filteredData.shops.length > 0) &&
        showResults && (
          <Div className="search-results">
            {filteredData.products.length > 0 && (
              <div>
                <ul>
                  {filteredData.products.map((product) => (
                    <li key={product.id}>
                      {" "}
                      {highlightMatch(product.title, query)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filteredData.categories.length > 0 && (
              <div>
                <ul>
                  {filteredData.categories.map((category) => (
                    <li key={category.id}>
                      {highlightMatch(category.name.toUpperCase(), query)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filteredData.blogs.length > 0 && (
              <div>
                <ul>
                  {filteredData.blogs.map((blog) => (
                    <li key={blog.id}> {highlightMatch(blog.title, query)}</li>
                  ))}
                </ul>
              </div>
            )}
            {filteredData.shops.length > 0 && (
              <div>
                <ul>
                  {filteredData.shops.map((shop) => (
                    <li key={shop.id}> {highlightMatch(shop.name, query)}</li>
                  ))}
                </ul>
              </div>
            )}
            <Close
              onClick={() => {
                setShowInput(!true);
                setShowResults(!showResults);
              }}
            />
          </Div>
        )}
    </Wrap>
  );
}
