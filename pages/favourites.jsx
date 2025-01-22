import React, { useState, useEffect } from 'react';
import RootLayout from './layout';
import { getServerSession } from 'next-auth';
import { Users } from '@/models/Accounts';
import { authOptions } from './api/auth/[...nextauth]';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import ProductCard from '@/components/frontend/ProductCard';
import { motion } from 'framer-motion'; // Import Framer Motion
import { ClipLoader } from 'react-spinners'; // Import React Spinner
import { FavoriteBorderSharp } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function Favourites({ wishList, products }) {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(wishList || []);
  const [wishProducts, setWishProducts] = useState(
    () =>
      wishlist
        .map((wish) =>
          products.find((product) => product._id.toString() === wish.productId),
        )
        .filter(Boolean), // Remove undefined/null products
  );
  const [loadingIds, setLoadingIds] = useState([]); // Track IDs of products being deleted

  useEffect(() => {
    setWishProducts(
      wishlist
        .map((wish) =>
          products.find((product) => product._id.toString() === wish.productId),
        )
        .filter(Boolean), // Remove undefined/null products
    );
  }, [wishlist, products]);

  const handleDelete = async (wishId) => {
    try {
      setLoadingIds((prev) => [...prev, wishId]); // Add the wishId to loading state

      const response = await fetch('/api/frontend/favourites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishId }),
      });

      if (response.ok) {
        const data = await response.json();
        setWishlist(wishList.filter((wish) => wish._id.toString() !== wishId));
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error in handleDelete:', error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== wishId)); // Remove the wishId from loading state
    }
  };

  return (
    <RootLayout>
      <div className="min-h-screen">
        {wishProducts.length > 0 && (
          <h1
            className="py-6 text-center font-semibold text-[.9rem] bg-[#d8d5d5]"
            style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}
          >
            Saved Items
          </h1>
        )}
        {wishProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
            {wishProducts.map((item) => {
              if (!item) return null; // Skip null/undefined items

              const wishId = wishlist?.find(
                (wish) => wish?.productId === item?._id.toString(),
              )?._id;
              const isLoading = loadingIds.includes(wishId); // Check if the product is being deleted

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    isLoading
                      ? { opacity: 0, scale: 0 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <ClipLoader size={30} color="gray" />
                    </div>
                  ) : (
                    <ProductCard
                      {...item}
                      genderName={item.gender?.name}
                      wishId={wishId} // Pass the wishId to ProductCard
                      handleDelete={handleDelete} // Pass handleDelete function
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-10 min-h-screen">
            <span>
              <FavoriteBorderSharp />{' '}
            </span>
            <h2
              className="text-[.9rem] capitalize font-bold mb-2 text-[#000000c1]"
              style={{ fontFamily: 'Futura Std Heavy', letterSpacing: 0.4 }}
            >
              Your have no saved items yet!
            </h2>
            <p className="text-gray-500 text-xs">
              Start saving as you shop by selecting the little heart. <br />
              We will sync your items across all devices.Easy.
            </p>
            <button
              className="bg-black text-white mt-2 p-3 py-2"
              style={{ fontFamily: 'Futura Std Heavy', letterSpacing: 0.9 }}
              onClick={() => {
                router.push('/products');
              }}
            >
              START SHOPPING
            </button>
          </div>
        )}
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  try {
    await mongooseConnect();

    const { req, res } = context;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: '/auth/sign-in',
          permanent: false,
        },
      };
    }

    const userId = session.user.id;
    const user = await Users.findById(userId);
    const products = await Product.find({}).populate('gender');

    if (!user) {
      return {
        notFound: true,
      };
    }

    const wishList = Array.isArray(user.wishlist) ? user.wishlist : [];

    return {
      props: {
        wishList: JSON.parse(JSON.stringify(wishList)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        wishList: [],
        products: [],
      },
    };
  }
}
