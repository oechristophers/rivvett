import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { Blog } from '@/models/Blog';
import { Gallery } from '@/models/Gallery';
import mongoose from 'mongoose';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import RootLayout from '../layout';
import { Gender } from '@/models/Gender';
// Dynamically import non-critical components
const AppPromote = dynamic(() => import('@/components/frontend/AppPromote'), {
  ssr: false,
});
const PromotionBox = dynamic(
  () => import('@/components/frontend/PromotionBox'),
  { ssr: true },
);
const BottomP = dynamic(() => import('@/components/frontend/BottomP'), {
  ssr: false,
});
const FeaturedCollection = dynamic(
  () => import('@/components/frontend/FeaturedCollection'),
  { ssr: false },
);
const FeaturedShops = dynamic(
  () => import('@/components/frontend/FeaturedShops'),
  { ssr: false },
);
const GalleryDisplay = dynamic(
  () => import('@/components/frontend/GalleryDisplay'),
  { ssr: false },
);
const Hero = dynamic(() => import('@/components/frontend/Hero'), { ssr: true });
const ProductCarousel = dynamic(
  () => import('@/components/frontend/ProductCarousel'),
  { ssr: false },
);
const ShopMore = dynamic(() => import('@/components/frontend/ShopMore'), {
  ssr: false,
});
const StyleFeed = dynamic(() => import('@/components/frontend/StyleFeed'), {
  ssr: false,
});

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
    (property) => property.name === 'collection',
  ).values;

  const collections = collectionPropValue.filter((collection) =>
    colProps
      .map((prop) => prop)
      .flat()
      .includes(collection),
  );

  const newCollections = collections.push(
    collectionPropValue.filter((item) => item === 'collision-edit'),
  );

  const maleCollection = collections.shift();

  //Shop prop for male
  const shopProps = maleProd.map((product) => product.shop);

  const shopPropValue = maleCat[0].properties.find(
    (property) => property.name === 'shop',
  ).values;

  const shops = shopPropValue.filter((shop) =>
    shopProps
      .map((prop) => prop)
      .flat()
      .includes(shop),
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

  return (
    <RootLayout>
      <PromotionBox />

      <motion.div initial="hidden" animate="visible">
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturedCollection collections={collections.flat()} />
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
        <FeaturedShops shops={shops} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <StyleFeed blogs={maleBlogs} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <GalleryDisplay gallery={maleGallery} />
      </motion.div>

      <div className="overflow-x-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInFromRight}
          viewport={{ once: true, amount: 0.2 }}
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
  const maleGenderId = '669161b8bbede0f410af829e';
  await mongooseConnect();

  const [randomProducts, maleProducts, maleCategories, maleBlogs, maleGallery] =
    await Promise.all([
      Product.aggregate([
        { $match: { gender: new mongoose.Types.ObjectId(maleGenderId) } },
        { $sample: { size: 12 } },
      ]),
      Product.find({ gender: maleGenderId }).populate('gender'),
      Category.find({}),
      Blog.find({ gender: maleGenderId }),
      Gallery.find({ gender: maleGenderId }),
    ]);

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
