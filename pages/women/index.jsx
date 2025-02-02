import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { Blog } from "@/models/Blog";
import { Gallery } from "@/models/Gallery";
import mongoose from "mongoose";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RootLayout from "../layout";
import { Gender } from "@/models/Gender";
import { UseIsDevice } from "@/components/frontend/DeviceView";
import { useState } from "react";
// Dynamically import non-critical components
const AppPromote = dynamic(() => import("@/components/frontend/AppPromote"), {
  ssr: false,
});
const PromotionBox = dynamic(
  () => import("@/components/frontend/PromotionBox"),
  { ssr: true }
);
const BottomP = dynamic(() => import("@/components/frontend/BottomP"), {
  ssr: false,
});
const FeaturedCollection = dynamic(
  () => import("@/components/frontend/FeaturedCollection"),
  { ssr: false }
);
const FeaturedShops = dynamic(
  () => import("@/components/frontend/FeaturedShops"),
  { ssr: false }
);
const GalleryDisplay = dynamic(
  () => import("@/components/frontend/GalleryDisplay"),
  { ssr: false }
);
const Hero = dynamic(() => import("@/components/frontend/Hero"), { ssr: true });
const ProductCarousel = dynamic(
  () => import("@/components/frontend/ProductCarousel"),
  { ssr: false }
);
const ShopMore = dynamic(() => import("@/components/frontend/ShopMore"), {
  ssr: false,
});
const StyleFeed = dynamic(() => import("@/components/frontend/StyleFeed"), {
  ssr: false,
});

export default function WomenHome({
  femaleCategories,
  femaleProducts,
  randomProducts,
  femaleBlogs,
  femaleGallery,
}) {
  const { isHighMobile } = UseIsDevice();
  const femaleProd = femaleProducts.map((product) => product.properties);
  const genderName = femaleProducts[0].gender.name;
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
  );
  const femaleCategories2 = femaleCat2
    .filter((cat) => cat.name !== "BLOG CATEGORY")
    .concat(cathy);
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
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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
    <RootLayout>
      <PromotionBox />

      <Hero isHeroLoaded={isHeroLoaded} setIsHeroLoaded={setIsHeroLoaded} />

      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <FeaturedCollection femaleCollection={femaleCollection} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ProductCarousel products={randomProducts} genderName={genderName} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturedShops femaleShops={femaleShops} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <StyleFeed blogs={femaleBlogs} inId={false} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <GalleryDisplay gallery={femaleGallery} />
      </motion.div>

      <div style={{ overflowX: "hidden" }}>
        {" "}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInFromRight}
          viewport={{ once: true, amount: 0.2 }}
          style={{ overflowX: "hidden" }}
        >
          <AppPromote />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ShopMore products={randomProducts} />
      </motion.div>

      <BottomP />
    </RootLayout>
  );
}

export async function getServerSideProps() {
  const femaleGenderId = "669161c1bbede0f410af82a2";
  await mongooseConnect();
  const randomProducts = await Product.aggregate([
    {
      $match: { gender: new mongoose.Types.ObjectId(femaleGenderId) },
    },
    { $sample: { size: 12 } }, // Just match, no sampling
  ]);
  const femaleProducts = await Product.find({
    gender: femaleGenderId,
  }).populate("gender");

  const femaleCategories = await Category.find({}).exec();
  const femaleBlogs = await Blog.find({ gender: femaleGenderId }).exec();
  const femaleGallery = await Gallery.find({ gender: femaleGenderId }).exec();

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
