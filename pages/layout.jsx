// components/Layout.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; // Optional if you use styled-components for styling
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterIcons from "@/components/FooterIcons";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [products, setProducts] = useState([]);
  const [forMNav, setForMNav] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const rout = useRouter();
  const ls = typeof localStorage !== 'undefined' ? localStorage : null;

  const prevPath = useRef(ls ? ls.getItem("prevPath") : 'women');
  const currentPath = rout.pathname.split("/")[1] || prevPath?.current || 'women';

  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    // Store the previous path when not on cart page
    if (currentPath !== "cart") {
      localStorage.setItem("prevPath", currentPath);
    }

    // Determine path to use
    const pathToUse =
      currentPath === "cart" ? localStorage.getItem("prevPath") : currentPath;
    setActiveButton(pathToUse !== null? pathToUse : "women");

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const filteredProducts = data.filter(
          (product) => product.gender.name === pathToUse
        );
        setProducts(filteredProducts);

        return filteredProducts.map((item) => ({ ...item, type: "product" }));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCategories = async (filteredProducts) => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        const prodCats = filteredProducts.map((prod) => prod.category);
        const parentCategories = data.filter(
          (cat) => !cat.parent && cat.name !== "BLOG CATEGORY"
        );
        const relatedCategories = data.filter((cat) =>
          prodCats.includes(cat._id)
        );

        const combinedCategories = [...parentCategories, ...relatedCategories];
        setCategories(combinedCategories);
        setCategories2(combinedCategories);

        return combinedCategories.map((item) => ({
          ...item,
          type: "category",
        }));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();

        const filteredBlogs = data.filter(
          (blog) => blog.gender.name === pathToUse
        );
        setBlogs(filteredBlogs);

        return filteredBlogs.map((item) => ({ ...item, type: "blog" }));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts();
        const categoriesData = await fetchCategories(productsData);
        const blogsData = await fetchBlogs();

        const combined = [...categoriesData, ...productsData, ...blogsData];
        setCombinedData(combined);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPath]);

  useEffect(() => {
    const updateForMNav = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const filteredProducts = data.filter(
          (product) => product.gender.name !== activeButton && product.gender.name !== 'unisex'
        );

        setForMNav(filteredProducts);
        
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCategoriesForMNav = async () => {
      updateForMNav();

      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        const prodCats2 = forMNav.map((prod) => prod.category);
        const parentCategories = data.filter(
          (cat) => !cat.parent && cat.name !== "BLOG CATEGORY"
        );
        const relatedCategories2 = data.filter((cat) =>
          prodCats2.includes(cat._id)
        );

        const combinedCategories2 = [
          ...parentCategories,
          ...relatedCategories2,
        ];
        setCategories2(combinedCategories2);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategoriesForMNav();
  }, [activeButton]);

  // console.log(prevPath)
  // console.log(activeButton);

  //   useEffect(() => {
  //     console.log('Products:', products);
  //     console.log('Categories:', categories);
  //   }, [products, categories]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  return (
    <>
      <Header
        categories={categories}
        prevPath={prevPath}
        data={combinedData}
        categories2={categories2}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      {children}
      <FooterIcons />
      <Footer />
    </>
  );
};

export default Layout;
