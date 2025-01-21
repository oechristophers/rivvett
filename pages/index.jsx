import { useSession } from 'next-auth/react';
import FeaturedCategory from '@/components/frontend/FeaturedCategory';
import Hero from '@/components/frontend/Hero';
import InfoBox from '@/components/frontend/InfoBox';
import PromotionBox from '@/components/frontend/PromotionBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category'; 
import { Gender } from '@/models/Gender';
import RootLayout from './layout';
import { motion } from 'framer-motion';

export default function HomePage({
  featuredProduct,
  newProducts,
  femaleProducts,
  maleProducts,
  maleCategories,
  femaleCategories,
})  {
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

  return (
    <RootLayout>
     
        <PromotionBox />

      
        <Hero />

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
          maleCategories={maleCategories}
          femaleCategories={femaleCategories}
        />
      </motion.div>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '66916d6b0bcdc28de9ccc8d6';
  const maleGenderId = '669161b8bbede0f410af829e';
  const femaleGenderId = '669161c1bbede0f410af82a2';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const maleProducts = await Product.find({ gender: maleGenderId });
  const maleCategories = await Category.find({}).exec();
  const femaleProducts = await Product.find({ gender: femaleGenderId });
  const femaleCategories = await Category.find({}).exec();

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

// export default function Home() {
//   const { data: session, status } = useSession();
//   // Check if the user is a customer (assuming you're checking role from session)
//   const isCustomer = session?.user?.role === "customer"; // Adjust according to your session data structure

// // Handle when the user is not a customer (e.g., admin or other role)
// if (!isCustomer) {
//   return (
//     <Layout>
//       <div>Access denied: You are not a customer.</div>
//     </Layout>
//   );
// }

//   return (
//     <Layout>
//       <div className="text-blue-900 flex flex-col justify-center min-h-screen items-center">
//         <h1>
//        This is the Home page for Admin.
//         </h1>
//            <p> <Link href={'/server/dashboard'}>Click here</Link> <span className="text-white">to go to dashboard</span></p>
//       </div>
//     </Layout>
//   );
// }
