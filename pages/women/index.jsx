import AppPromote from "@/components/AppPromote";
import BottomP from "@/components/BottomP";
import FeaturedCollection from "@/components/FeaturedCollection";
import FeaturedShops from "@/components/FeaturedShops";
import Footer from "@/components/Footer";
import FooterIcons from "@/components/FooterIcons";
import GalleryDisplay from "@/components/GalleryDisplay";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import PromotionBox from "@/components/PromotionBox";
import ShopMore from "@/components/ShopMore";
import StyleFeed from "@/components/StyleFeed";
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Category } from "@/models/Category";
import { Gallery } from "@/models/Gallery";
import { Gender } from "@/models/Gender";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import Layout from "../layout";

export default function womenHome({femaleCategories,femaleProducts,randomProducts, femaleBlogs, femaleGallery,}){
  const femaleProd = femaleProducts.map((product) => product.properties);
  const genderName = femaleProducts[0].gender.name
  const femaleCat = femaleCategories.filter((category) => !category.parent);

  const femaleCat2 = femaleCategories.filter((category) => !category.parent);

  const femaleProps = femaleProd.map((product) => product.collection);
 
  // console.log(femaleProps)

  const femalePropertyNames = femaleCat[0].properties.find(
    (property) => property.name === "collection"
  ).values;
 

  // console.log(femalePropertyNames.filter((item) => item === "collision-edit"));

  const collections = femalePropertyNames.filter((collection) =>
    femaleProps
      .map((prop) => prop)
      .flat()
      .includes(collection)
  );

  //for CatNav
  const find = femaleProducts.map((prod) => prod.category);
  const cathy = femaleCategories.filter((category) =>
    find.includes(category._id)
  )
  const femaleCategories2 = femaleCat2.filter((cat)=> cat.name !== 'BLOG CATEGORY').concat(cathy) ;
  // console.log(femaleCategories2)

 

  const newCollections = collections.push(
    femalePropertyNames.filter((item) => item === "collision-edit")
  );
 
  const femaleCollection = collections.flat();

  // console.log(femaleCollection);

  //Shop prop for female
  const shopProps = femaleProd.map((product) => product.shop);
  
  const shopPropValue = femaleCat[0].properties.find(
    (property) => property.name === "shop"
  ).values;
  

  const femaleShops = shopPropValue.filter((shop) =>
    shopProps
      .map((prop) => prop)
      .flat()
      .includes(shop)
  );
  console.log(femaleShops);
    return(
        <Layout>
    <PromotionBox/>
    <Hero/>
    <FeaturedCollection femaleCollection={femaleCollection}/>
    <ProductCarousel products={randomProducts} genderName={genderName}/>
    <FeaturedShops femaleShops={femaleShops} />
    <StyleFeed blogs={femaleBlogs}/>
    <GalleryDisplay gallery={femaleGallery}/>
    <AppPromote/>
    <ShopMore products={randomProducts}/>
    <BottomP/>
   
</Layout>
    )
}

export async function getServerSideProps() {
  const femaleGenderId='669161c1bbede0f410af82a2'
  await mongooseConnect();  const randomProducts = await Product.aggregate([
    {
      $match: { gender: new mongoose.Types.ObjectId(femaleGenderId) }
    },
    { $sample:{size: 12}} // Just match, no sampling
  ]);
  const femaleProducts = await Product.find({gender:femaleGenderId}).populate('gender')
  const femaleCategories = await Category.find({}).exec()
  const femaleBlogs = await Blog.find({gender:femaleGenderId}).exec();
  const femaleGallery = await Gallery.find({gender:femaleGenderId}).exec();
  return {
    props: {
      randomProducts: JSON.parse(JSON.stringify(randomProducts)),
      femaleProducts: JSON.parse(JSON.stringify(femaleProducts)),
      femaleCategories: JSON.parse(JSON.stringify(femaleCategories)),
      femaleBlogs: JSON.parse(JSON.stringify(femaleBlogs)),
      femaleGallery: JSON.parse(JSON.stringify(femaleGallery)),
    },
  };
  }