import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import FooterIcons from '@/components/frontend/FooterIcons';
import { useRouter } from 'next/router';

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

  useEffect(() => {
    // Ensure localStorage is accessed only in the browser
    if (typeof window !== 'undefined') {
      const ls = window.localStorage;

      // Set previous path
      const storedPrevPath = ls.getItem('prevPath') || 'women';
      setPrevPath(storedPrevPath);

      // Update localStorage if the current path is valid
      if (currentPath !== 'products' && currentPath !== 'cart') {
        ls.setItem('prevPath', currentPath);
      }

      // Determine the active button
      const pathToUse =
        currentPath === 'cart' || currentPath === 'products'
          ? storedPrevPath
          : currentPath;
      setActiveButton(pathToUse);
    }
  }, [currentPath]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/frontend/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      const filteredProducts = data.filter(
        (product) => product.gender.name === activeButton,
      );
      setProducts(filteredProducts);

      return filteredProducts.map((item) => ({ ...item, type: 'product' }));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategories = async (filteredProducts) => {
    try {
      const response = await fetch('/api/frontend/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();

      const prodCats = filteredProducts.map((prod) => prod.category);
      const parentCategories = data.filter(
        (cat) => !cat.parent && cat.name !== 'BLOG CATEGORY',
      );
      const relatedCategories = data.filter((cat) =>
        prodCats.includes(cat._id),
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

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/frontend/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();

      const filteredBlogs = data.filter(
        (blog) => blog.gender.name === activeButton,
      );
      setBlogs(filteredBlogs);

      return filteredBlogs.map((item) => ({ ...item, type: 'blog' }));
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

  useEffect(() => {
    fetchData();
  }, [activeButton]);

  const updateForMNav = async () => {
    try {
      const response = await fetch('/api/frontend/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      const filteredProducts = data.filter(
        (product) =>
          product.gender.name !== activeButton &&
          product.gender.name !== 'unisex',
      );

      setForMNav(filteredProducts);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategoriesForMNav = async () => {
    await updateForMNav();

    try {
      const response = await fetch('/api/frontend/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();

      const prodCats2 = forMNav.map((prod) => prod.category);
      const parentCategories = data.filter(
        (cat) => !cat.parent && cat.name !== 'BLOG CATEGORY',
      );
      const relatedCategories2 = data.filter((cat) =>
        prodCats2.includes(cat._id),
      );

      const combinedCategories2 = [...parentCategories, ...relatedCategories2];
      setCategories2(combinedCategories2);
    } catch (error) {
      setError(error.message);
    }
  };

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
