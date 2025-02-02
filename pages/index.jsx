import { useSession } from "next-auth/react";
import FeaturedCategory from "@/components/frontend/FeaturedCategory";
import Hero from "@/components/frontend/Hero";
import InfoBox from "@/components/frontend/InfoBox";
import PromotionBox from "@/components/frontend/PromotionBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { Gender } from "@/models/Gender";
import RootLayout from "./layout";
import { motion } from "framer-motion";
import { Blog } from "@/models/Blog";
import { useState } from "react";

export default function HomePage({
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
}) {
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
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  return (
    <RootLayout
      productCategories={productCategories}
      maleGender={maleGender}
      femaleGender={femaleGender}
      allProducts={allProducts}
      maleBlogs={maleBlogs}
      femaleBlogs={femaleBlogs}
      featuredProduct={featuredProduct}
      newProducts={newProducts}
      maleProducts={maleProducts}
      femaleProducts={femaleProducts}
    >
      <PromotionBox />

      <Hero isHeroLoaded={isHeroLoaded} setIsHeroLoaded={setIsHeroLoaded} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={grow}
        viewport={{ once: true, amount: 0.5 }}
      >
        <InfoBox />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturedCategory
          femaleProducts={femaleProducts}
          maleProducts={maleProducts}
          maleCategories={productCategories}
          femaleCategories={productCategories}
        />
      </motion.div>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66916d6b0bcdc28de9ccc8d6";
  const maleGenderId = "669161b8bbede0f410af829e";
  const femaleGenderId = "669161c1bbede0f410af82a2";

  try {
    await mongooseConnect();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const maleProducts = await Product.find({ gender: maleGenderId });
  const femaleProducts = await Product.find({ gender: femaleGenderId });
  const allProducts = await Product.find({}).populate("gender");
  const productCategories = await Category.find({}).exec();
  const maleGender = await Gender.findOne({ name: "men" }).exec();
  const femaleGender = await Gender.findOne({ name: "women" }).exec();
  const maleBlogs = await Blog.find({ gender: maleGenderId }).exec();
  const femaleBlogs = await Blog.find({ gender: femaleGenderId }).exec();

  // Add fallback for undefined data
  return {
    props: {
      featuredProduct: featuredProduct
        ? JSON.parse(JSON.stringify(featuredProduct))
        : null,
      newProducts: newProducts ? JSON.parse(JSON.stringify(newProducts)) : [],
      maleProducts: maleProducts
        ? JSON.parse(JSON.stringify(maleProducts))
        : [],
      femaleProducts: femaleProducts
        ? JSON.parse(JSON.stringify(femaleProducts))
        : [],
      productCategories: productCategories
        ? JSON.parse(JSON.stringify(productCategories))
        : [],
      maleBlogs: maleBlogs ? JSON.parse(JSON.stringify(maleBlogs)) : [],
      femaleBlogs: femaleBlogs ? JSON.parse(JSON.stringify(femaleBlogs)) : [],
      maleGender: maleGender ? JSON.parse(JSON.stringify(maleGender)) : null,
      femaleGender: femaleGender
        ? JSON.parse(JSON.stringify(femaleGender))
        : null,
      allProducts: allProducts ? JSON.parse(JSON.stringify(allProducts)) : [],
    },
  };
}
