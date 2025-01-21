import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Gender } from '@/models/Gender';
import { Product } from '@/models/Product';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RootLayout from '../layout';
import styled from 'styled-components';
import Wrapper from '@/components/frontend/Wrapper';
import ProductGrid from '@/components/frontend/ProductGrid';

const FiltersContainer = styled.div`
  margin-bottom: 20px;
`;
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 90%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  z-index: 50;
  overflow-y: auto;
  font-family: 'Futura Std Book';
  letter-spacing: 0.9px;
  h2 {
    font-family: 'Futura Std Heavy';
    letter-spacing: 1.2px;
  }
`;

const SidebarBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent backdrop */
  z-index: 40;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: opacity 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

export default function collections({ products, categories, properties }) {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    localStorage.setItem('collectionQuery', JSON.stringify(query.collection));
  }, [query.collection]);

  const handleFilterChange = (value, name) => {
    console.log(`Changed: ${name} = ${value}`); // Debugging log to check value
    const updatedQuery = { ...query, [name]: value };

    if (value === '') {
      delete updatedQuery[name]; // Remove filter if empty
    }

    router.push({
      pathname: '/women/collections',
      query: updatedQuery,
    });
  };
  const genderName = products[0].gender.name;

  const clearFilters = () => {
    let defaultQuery = localStorage.getItem('collectionQuery');
    if (defaultQuery) {
      defaultQuery = defaultQuery.replace(/^"|"$/g, ''); // Remove surrounding quotes
    }

    router.push({
      pathname: '/women/collections',
      query: defaultQuery ? { collection: defaultQuery } : {},
    });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <RootLayout>
      <h2
        className="text-center py-3 uppercase"
        style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}
      >
        "Women's Collections" :{' '}
        <span>{query.collection && query.collection}</span>
      </h2>
      <FiltersContainer className="hidden md:flex px-10 justify-between py-5 bg-[#c6c4c4]">
        <Select
          value={query.collection || ''}
          onValueChange={(value) => {
            console.log('Collection selected:', value); // Debugging log
            handleFilterChange(value, 'collection');
          }}
          name="Collection"
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0  w-[18%] border-y-2 ">
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            {properties.collection.map((collection, index) => (
              <SelectItem key={index} value={collection}>
                {collection}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* By Category */}
        <Select
          name="category"
          onValueChange={(value) => {
            console.log('Category selected:', value); // Debugging log
            handleFilterChange(value, 'category');
          }}
          value={query.category || ''}
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0 w-[18%] border-y-2  ">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>Category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Add color filter */}

        <Select
          value={query.color || ''}
          onValueChange={(value) => {
            console.log('Color selected:', value); // Debugging log
            handleFilterChange(value, 'color');
          }}
          name="Color"
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0  w-[18%] border-y-2 ">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>Color</SelectItem>
            {properties.color.map((color, index) => (
              <SelectItem key={index} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Add size filter */}
        <Select
          value={query.size || ''}
          onValueChange={(value) => {
            console.log('Size selected:', value); // Debugging log
            handleFilterChange(value, 'size');
          }}
          name="Size"
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0  w-[18%] border-y-2 ">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>Size</SelectItem>
            {properties.size.map((size, index) => (
              <SelectItem key={index} value={size}>
                US Size {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          name="Sort"
          onValueChange={(value) => {
            console.log('Sort by:', value); // Debugging log
            handleFilterChange(value, 'sort');
          }}
          value={query.sort || ''}
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0  w-[18%] border-y-2 ">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </FiltersContainer>

      <FiltersContainer className="grid grid-cols-2 md:hidden bg-[#cac8c8] divide-x-2 py-2 divide-[#0000001e] ">
        <div
          className=""
          style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}
        >
          <Select
            name="Sort"
            onValueChange={(value) => {
              console.log('Sort by:', value); // Debugging log
              handleFilterChange(value, 'sort');
            }}
            value={query.sort || ''}
          >
            <SelectTrigger className="w-[100%] mt-2 border-none flex shadow-none focus:outline-none outline-none gap-2  justify-center focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          className="py-3"
          onClick={toggleSidebar} // Open the sidebar
          style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}
        >
          Filter
        </button>
      </FiltersContainer>
      {/* Sidebar Backdrop */}
      <SidebarBackdrop isOpen={isSidebarOpen} onClick={toggleSidebar} />

      {/* Sidebar for Mobile */}
      <SidebarContainer isOpen={isSidebarOpen}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
        <div className="p-4">
          {/* Filters */}
          <Select
            value={query.collection || ''}
            onValueChange={(value) => {
              console.log('Collection selected:', value); // Debugging log
              handleFilterChange(value, 'collection');
            }}
            name="Collection"
          >
            <SelectTrigger className="w-full capitalize mb-4 border-none shadow-none focus:outline-none outline-none focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Collection" />
            </SelectTrigger>
            <SelectContent>
              {properties.collection.map((collection, index) => (
                <SelectItem key={index} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            name="category"
            onValueChange={(value) => {
              handleFilterChange(value, 'category');
            }}
            value={query.category || ''}
          >
            <SelectTrigger className="w-full capitalize mb-4 border-none shadow-none focus:outline-none outline-none focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add color filter */}

          <Select
            value={query.color || ''}
            onValueChange={(value) => {
              console.log('Color selected:', value); // Debugging log
              handleFilterChange(value, 'color');
            }}
            name="Color"
          >
            <SelectTrigger className="w-full capitalize mb-4 border-none shadow-none focus:outline-none outline-none focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>Color</SelectItem>
              {properties.color.map((color, index) => (
                <SelectItem key={index} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add size filter */}
          <Select
            value={query.size || ''}
            onValueChange={(value) => {
              console.log('Size selected:', value); // Debugging log
              handleFilterChange(value, 'size');
            }}
            name="Size"
          >
            <SelectTrigger className="w-full capitalize mb-4 border-none shadow-none focus:outline-none outline-none focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>Size</SelectItem>
              {properties.size.map((size, index) => (
                <SelectItem key={index} value={size}>
                  US Size {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button className="h-12 text-center bg-black text-white w-full">
            Apply
          </button>
        </div>
      </SidebarContainer>

      <Wrapper>
        <ProductGrid products={products} genderName={genderName} />
      </Wrapper>
    </RootLayout>
  );
}
export async function getServerSideProps({ query }) {
  await mongooseConnect();

  const femaleGenderId = '669161c1bbede0f410af82a2'; // female gender ID
  const unisexGenderId = '669161e1bbede0f410af82a7'; // Unisex gender ID

  // Base filter to exclude female gender
  const baseGenderFilter = {
    $or: [{ gender: femaleGenderId }, { gender: unisexGenderId }],
  };

  // Fetch the distinct list of collections only for products matching the base gender filter
  const allcollections = await Product.distinct(
    'properties.collection',
    baseGenderFilter
  );

  // Dynamically build the product filter based on query parameters
  const productFilter = { ...baseGenderFilter };

  if (query.collection)
    productFilter['properties.collection'] = query.collection;
  if (query.color) productFilter['properties.color'] = query.color;
  if (query.size) productFilter['properties.size'] = query.size;
  if (query.category) productFilter.category = query.category;

  // Sorting logic based on the query parameter 'sort'
  const sort =
    query.sort === 'price-asc'
      ? { price: 1 }
      : query.sort === 'price-desc'
        ? { price: -1 }
        : { _id: -1 }; // Default: Most recent

  // Fetch the filtered products from the database
  const products = await Product.find(productFilter, null, { sort }).populate([
    'category',
    'gender',
  ]);

  // Fetch distinct values for colors and sizes based on the filtered products
  const [categories, genders, colorProperties, sizeProperties] =
    await Promise.all([
      Category.find({
        name: { $ne: 'BLOG CATEGORY' },
        parent: { $ne: '670504cf2b1eeb8019f8e3fb' },
      }),
      Gender.find({}),
      Product.distinct('properties.color', productFilter), // Colors for filtered products
      Product.distinct('properties.size', productFilter), // Sizes for filtered products
    ]);

  // Aggregate properties into a single object
  const properties = {
    color: colorProperties.filter(Boolean), // Remove falsy values
    size: sizeProperties.filter(Boolean),
    collection: allcollections.filter(Boolean), // Use the filtered collection list
  };

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      genders: JSON.parse(JSON.stringify(genders)),
      properties,
    },
  };
}
