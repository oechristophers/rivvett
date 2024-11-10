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
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { Gender } from "@/models/Gender";
import Layout from "../layout";

export default function MenHome({
  maleCategories,
  maleProducts,
  randomProducts,
  maleBlogs,
  maleGallery,
}) {
  const genderName = maleProducts[0].gender.name;
  const maleProd = maleProducts.map((product) => product.properties);

  const maleCat = maleCategories.filter((category) => !category.parent);

  const maleCat2 = maleCategories.filter((category) => !category.parent);

  //Collections prop for male
  const colProps = maleProd.map((product) => product.collection);

  const collectionPropValue = maleCat[0].properties.find(
    (property) => property.name === "collection"
  ).values;

  const collections = collectionPropValue.filter((collection) =>
    colProps
      .map((prop) => prop)
      .flat()
      .includes(collection)
  );

  const newCollections = collections.push(
    collectionPropValue.filter((item) => item === "collision-edit")
  );

  const maleCollection = collections.shift();

  //Shop prop for male
  const shopProps = maleProd.map((product) => product.shop);

  const shopPropValue = maleCat[0].properties.find(
    (property) => property.name === "shop"
  ).values;

  const shops = shopPropValue.filter((shop) =>
    shopProps
      .map((prop) => prop)
      .flat()
      .includes(shop)
  );
  return (
    <Layout>
      <PromotionBox />
      <Hero />
      <FeaturedCollection collections={collections.flat()} />
      <ProductCarousel products={randomProducts} genderName={genderName} />
      <FeaturedShops shops={shops} />
      <StyleFeed blogs={maleBlogs} />
      <GalleryDisplay gallery={maleGallery} />
      <AppPromote />
      <ShopMore products={randomProducts} />
      <BottomP />
    </Layout>
  );
}

export async function getServerSideProps() {
  const maleGenderId = "669161b8bbede0f410af829e";
  await mongooseConnect();
  const randomProducts = await Product.aggregate([
    {
      $match: { gender: new mongoose.Types.ObjectId(maleGenderId) },
    },
    { $sample: { size: 12 } }, // Just match, no sampling
  ]);
  const maleProducts = await Product.find({ gender: maleGenderId }).populate(
    "gender"
  );

  const maleCategories = await Category.find({}).exec();
  const maleBlogs = await Blog.find({ gender: maleGenderId }).exec();
  const maleGallery = await Gallery.find({ gender: maleGenderId }).exec();

  return {
    props: {
      randomProducts: JSON.parse(JSON.stringify(randomProducts)),
      maleProducts: JSON.parse(JSON.stringify(maleProducts)),
      maleCategories: JSON.parse(JSON.stringify(maleCategories)),
      maleBlogs: JSON.parse(JSON.stringify(maleBlogs)),
      maleGallery: JSON.parse(JSON.stringify(maleGallery)),
    },
  };
}
