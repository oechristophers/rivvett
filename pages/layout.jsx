import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FooterIcons from "@/components/frontend/FooterIcons";
import { useGlobalContext } from "@/GlobalContext";
import Spinner from "@/components/frontend/Spinner";

const RootLayout = ({
  children,
  featuredProduct,
  newProducts,
  maleProducts,
  productCategories,
  femaleProducts,
  maleBlogs,
  femaleBlogs,
  maleGender,
  femaleGender,
  allProducts,
}) => {
  const { data, setData } = useGlobalContext();
  const router = useRouter();
  const currentPath = router.pathname.split("/")[1] || "women";

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [products, setProducts] = useState([]);
  const [forMNav, setForMNav] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [prevPath, setPrevPath] = useState("women");
  const [activeButton, setActiveButton] = useState(null);

  // Load data from localStorage or initialize it
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ls = window.localStorage;
    const storedData = JSON.parse(ls.getItem("layoutData"));

    if (!storedData || Object.keys(storedData).length === 0) {
      if (router.pathname !== "/") {
        // Redirect to main page if data is missing
        router.push("/");
        return;
      }

      // Initialize localStorage if empty
      const initialData = {
        featuredProduct,
        newProducts,
        maleProducts,
        femaleProducts,
        productCategories,
        maleBlogs,
        femaleBlogs,
        maleGender,
        femaleGender,
        allProducts,
      };

      ls.setItem("layoutData", JSON.stringify(initialData));
      setData(initialData);
    } else {
      // Rehydrate data from localStorage
      setData(storedData);
    }

    const storedPrevPath = ls.getItem("prevPath") || "women";
    setPrevPath(storedPrevPath);

    if (currentPath !== "products" && currentPath !== "cart") {
      ls.setItem("prevPath", currentPath);
    }

    const pathToUse =
      currentPath === "cart" || currentPath === "products"
        ? storedPrevPath
        : currentPath;

    setActiveButton(pathToUse);
    setLoading(false);
  }, []); // Run once on mount

  // Update data when active button changes
  useEffect(() => {
    if (!loading && activeButton) {
      const selectedGender =
        activeButton === "women" ? data?.femaleGender : data?.maleGender;
      const selectedProducts =
        activeButton === "women" ? data?.femaleProducts : data?.maleProducts;
      const selectedBlogs =
        activeButton === "women" ? data?.femaleBlogs : data?.maleBlogs;

      if (selectedGender?.name === activeButton) {
        setProducts(selectedProducts ?? []);

        const prodCats = selectedProducts?.map((prod) => prod?.category) ?? [];
        const parentCategories =
          data?.productCategories?.filter(
            (cat) => !cat.parent && cat.name !== "BLOG CATEGORY"
          ) ?? [];
        const relatedCategories =
          data?.productCategories?.filter((cat) =>
            prodCats.includes(cat?._id)
          ) ?? [];

        const combinedCategories = [...parentCategories, ...relatedCategories];
        setCategories(combinedCategories);
        setCategories2(combinedCategories);
        setBlogs(selectedBlogs ?? []);

        const combinedData = [
          ...combinedCategories.map((item) => ({ ...item, type: "category" })),
          ...(selectedProducts?.map((item) => ({ ...item, type: "product" })) ??
            []),
          ...(selectedBlogs?.map((item) => ({ ...item, type: "blog" })) ?? []),
        ];
        setCombinedData(combinedData);
      }
    }
  }, [activeButton, data, loading]);

  // Update navigation and secondary categories
  useEffect(() => {
    if (!loading && activeButton) {
      const filteredProducts =
        data?.allProducts?.filter(
          (product) =>
            product?.gender?.name === activeButton &&
            product?.gender?.name !== "unisex"
        ) ?? [];

      setForMNav(filteredProducts);

      const prodCats2 = filteredProducts.map((prod) => prod?.category) ?? [];
      const parentCategories =
        data?.productCategories?.filter(
          (cat) => !cat.parent && cat.name !== "BLOG CATEGORY"
        ) ?? [];
      const relatedCategories2 =
        data?.productCategories?.filter((cat) =>
          prodCats2.includes(cat?._id)
        ) ?? [];

      const combinedCategories2 = [...parentCategories, ...relatedCategories2];
      setCategories2(combinedCategories2);
    }
  }, [activeButton, data, loading]);

  if (loading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            opacity: 0.2,
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    );
  }

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
