import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import ProductCard from './ProductCard';
import CategoryCard from './CatCard';
import InstaIcon from './icons/SocialIcons';

const Title = styled.h2`
  font-size: 2.6rem;
  text-align: center;
  font-family: 'Futura Std heavy';
  letter-spacing: 1.2px;
`;
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 25px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 25px 0;
  }
`;
const Div = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;
export default function FeaturedCategory({
  maleProducts,
  maleCategories,
  femaleProducts,
  femaleCategories,
}) {
  // const check = maleCategories?.filter( maleProducts[0].category === maleCategories._id)
  // console.log(maleCategories.filter(category => category._id === maleProducts.category));
  // console.log( maleProducts.map(pcat => pcat.category))
  const maleProd = maleProducts.map((pcat) => pcat.category); // Array of categories from maleProducts

  const filteredMaleCat = maleCategories
    .filter((mcat) => maleProd.includes(mcat._id))
    .map((cat) => cat);

  const femaleProd = femaleProducts.map((pcat) => pcat.category);

  const filteredFemaleCat = femaleCategories
    .filter((mcat) => femaleProd.includes(mcat._id))
    .map((cat) => cat);

  return (
    <>
      <Title>Denim Essentials</Title>

      <div>
        <StyledGrid>
          {filteredMaleCat && filteredMaleCat.length > 0 ? (
            filteredMaleCat.map((category) => (
              <CategoryCard
                key={category._id}
                {...category}
                filteredMaleCat={filteredMaleCat}
              />
            ))
          ) : (
            <li>No categories available</li>
          )}{' '}
        </StyledGrid>
        <Div>
          <ButtonLink shop href={'/products'}>
            Shop Men&apos;s <br /> Denim
          </ButtonLink>
        </Div>

        <StyledGrid>
          {filteredFemaleCat && filteredFemaleCat.length > 0 ? (
            filteredFemaleCat.map((category) => (
              <CategoryCard key={category._id} {...category} />
            ))
          ) : (
            <li>No categories available</li>
          )}{' '}
        </StyledGrid>
        <Div>
          <ButtonLink shop href={'/products'}>
            Shop Women&apos;s <br /> Denim
          </ButtonLink>
        </Div>
      </div>
    </>
  );
}

// const [categories, setCategories] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
//     const fetchCategories = async ({newProducts}) => {
//         try {
//             const response = await fetch('/api/categories'); // Adjust the API endpoint as needed
//             if (!response.ok) {
//                 throw new Error('Failed to fetch categories');
//             }
//             const data = await response.json();
//             setCategories(data);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchCategories();
// }, []);
