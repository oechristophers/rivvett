import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import FooterIcons from '@/components/frontend/FooterIcons';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

const RootLayout = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [products, setProducts] = useState([]);
  const [forMNav, setForMNav] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const [prevPath, setPrevPath] = useState('women');
  const [activeButton, setActiveButton] = useState(null);

  const rout = useRouter();
  const currentPath = rout.pathname.split('/')[1] || prevPath || 'women';

  const prevActiveButton = useRef(activeButton);

  // Set initial active button and previous path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ls = window.localStorage;
      const storedPrevPath = ls.getItem('prevPath') || 'women';
      setPrevPath(storedPrevPath);

      if (currentPath !== 'products' && currentPath !== 'cart') {
        ls.setItem('prevPath', currentPath);
      }

      const pathToUse =
        currentPath === 'cart' || currentPath === 'products'
          ? storedPrevPath
          : currentPath;
      setActiveButton(pathToUse);
    }
  }, [currentPath]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/frontend/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      const filteredProducts = data.filter(
        (product) => product.gender.name === activeButton
      );
      setProducts(filteredProducts);

      return filteredProducts.map((item) => ({ ...item, type: 'product' }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch categories
  const fetchCategories = async (filteredProducts) => {
    try {
      const response = await fetch('/api/frontend/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();

      console.log('Categories response data:', data);

      const prodCats = filteredProducts.map((prod) => prod.category);
      const parentCategories = data.filter(
        (cat) => !cat.parent && cat.name !== 'BLOG CATEGORY'
      );
      const relatedCategories = data.filter((cat) =>
        prodCats.includes(cat._id)
      );

      const combinedCategories = [...parentCategories, ...relatedCategories];
      setCategories(combinedCategories);
      setCategories2(combinedCategories);

      return combinedCategories.map((item) => ({
        ...item,
        type: 'category',
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/frontend/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();

      const filteredBlogs = data.filter(
        (blog) => blog.gender.name === activeButton
      );
      setBlogs(filteredBlogs);

      return filteredBlogs.map((item) => ({ ...item, type: 'blog' }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Combined fetch function with debouncing
  const fetchData = debounce(async () => {
    if (prevActiveButton.current === activeButton) return; // Prevent unnecessary requests

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

    prevActiveButton.current = activeButton; // Update previous active button
  }, 300);

  useEffect(() => {
    fetchData();
  }, [activeButton]);

  // Fetch categories for MNav with debouncing
  const fetchCategoriesForMNav = debounce(async () => {
    try {
      const response = await fetch('/api/frontend/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      const filteredProducts = data.filter(
        (product) =>
          product.gender.name !== activeButton &&
          product.gender.name !== 'unisex'
      );
      setForMNav(filteredProducts);

      const catResponse = await fetch('/api/frontend/categories');
      if (!catResponse.ok) throw new Error('Failed to fetch categories');
      const catData = await catResponse.json();

      console.log('Categories for MNav:', catData);

      const prodCats2 = filteredProducts.map((prod) => prod.category);
      const parentCategories = catData.filter(
        (cat) => !cat.parent && cat.name !== 'BLOG CATEGORY'
      );
      const relatedCategories2 = catData.filter((cat) =>
        prodCats2.includes(cat._id)
      );

      const combinedCategories2 = [...parentCategories, ...relatedCategories2];
      setCategories2(combinedCategories2);
    } catch (error) {
      setError(error.message);
    }
  }, 300);

  useEffect(() => {
    fetchCategoriesForMNav();
  }, [activeButton]);
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
      <div className="scroll-smooth">{children}</div>
      <FooterIcons />
      <Footer />
    </>
  );
};

export default RootLayout;
