import Featured from "@/components/Featured";
import FeaturedCategory from "@/components/FeaturedCategory";
import Footer from "@/components/Footer";
import FooterIcons from "@/components/FooterIcons";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoBox from "@/components/InfoBox";
import NewProducts from "@/components/NewProducts";
import PromotionBox from "@/components/PromotionBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import Layout from "./layout";

export default function HomePage({featuredProduct,newProducts,femaleProducts,maleProducts, maleCategories,femaleCategories  }) {
  // console.log(product);
  return (
  <Layout>
   
     <PromotionBox/>
    {/* <Featured product={featuredProduct}/> */}
    <Hero/>
    {/* <NewProducts products={newProducts}/> */}
    <InfoBox/>
    <FeaturedCategory femaleProducts={femaleProducts} maleProducts={maleProducts} maleCategories={maleCategories} femaleCategories={femaleCategories}  />
  
  </Layout>
  )
}

export async function getServerSideProps() {
const featuredProductId ='66916d6b0bcdc28de9ccc8d6'
const maleGenderId='669161b8bbede0f410af829e'
const femaleGenderId='669161c1bbede0f410af82a2'
await mongooseConnect();
const featuredProduct = await Product.findById(featuredProductId)
const newProducts = await Product.find({}, null, {sort: {'_id':-1 },limit:10})
const maleProducts = await Product.find({gender:maleGenderId})
const maleCategories = await Category.find({}).exec()
const femaleProducts = await Product.find({gender:femaleGenderId})
const femaleCategories = await Category.find({}).exec()

return {
  props: {
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
    maleProducts: JSON.parse(JSON.stringify(maleProducts)),
    maleCategories: JSON.parse(JSON.stringify(maleCategories)),
    femaleProducts: JSON.parse(JSON.stringify(femaleProducts)),
    femaleCategories: JSON.parse(JSON.stringify(femaleCategories)),
  },
};
}
