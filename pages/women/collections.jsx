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
  display: flex;
  ${(props) =>
    props.desktop &&
    `
    
     @media screen and (max-width: 768px) {
      display: none;
    };
      `}
  ${(props) =>
    props.mobile &&
    `
    display: grid;
    grid-template-columns: 1fr 1fr;
     @media screen and (min-width: 769px) {
      display: none;
     };
  `}
`;
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 90%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  z-index: 50;
  overflow-y: auto;
  font-family: "Futura Std Book";
  letter-spacing: 0.9px;
  h2 {
    font-family: "Futura Std Heavy";
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
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transition: opacity 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;
export default function Collections({ products, categories, properties }) {
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
        &ldquo;Women&apos;s Collections&ldquo; :{' '}
        <span>{query.collection && query.collection}</span>
      </h2>
      <FiltersContainer desktop className=" px-10 justify-between py-5 bg-[#c6c4c4]">
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

      <FiltersContainer mobile className=" bg-[#cac8c8] divide-x-2 py-2 divide-[#0000001e] ">
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
            onClick={()=>{
              clearFilters()
              toggleSidebar()
            }}
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

          <button
            className="h-12 text-center bg-black text-white w-full"
            onClick={toggleSidebar}
          >
            {" "}
            Apply
          </button>
        </div>
      </SidebarContainer>

      <Wrapper products={products}>
        <ProductGrid products={products} genderName={genderName} />
      </Wrapper>

      {!products.length && (
        <div className="text-center py-12">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </RootLayout>
  );
}

export async function getServerSideProps({ query }) {
  await mongooseConnect();

  const femaleGenderId = '669161c1bbede0f410af82a2'; // female gender ID
  const unisexGenderId = '669161e1bbede0f410af82a7'; // Unisex gender ID

  // Base gender filter for male and unisex
  const baseGenderFilter = {
    $or: [{ gender: femaleGenderId }, { gender: unisexGenderId }],
  };

  // Fetch the selected category based on query.category
  const selectedCategory = query.category
    ? await Category.findById(query.category)
    : null;

  if (query.category && !selectedCategory) {
    return {
      notFound: true,
    };
  }

  // Find all child categories if a selected category exists
  const childCategories = selectedCategory
    ? await Category.find({ parent: selectedCategory._id })
    : [];

  // Aggregate category IDs (selected + children) for filtering
  const categoryIds = selectedCategory
    ? [selectedCategory._id, ...childCategories.map((cat) => cat._id)]
    : [];

  // Base product filter
  const productFilter = {
    ...baseGenderFilter,
    ...(categoryIds.length && { category: { $in: categoryIds } }),
  };

  // Add additional filters dynamically from query
  if (query.collection)
    productFilter['properties.collection'] = query.collection;
  if (query.color) productFilter['properties.color'] = query.color;
  if (query.size) productFilter['properties.size'] = query.size;

  // Sorting logic
  const sort =
    query.sort === 'price-asc'
      ? { price: 1 }
      : query.sort === 'price-desc'
        ? { price: -1 }
        : { _id: -1 }; // Default: Most recent

  // Fetch the filtered products
  const products = await Product.find(productFilter, null, { sort }).populate([
    'category',
    'gender',
  ]);

  // Fetch the distinct list of collections for products matching the base filter
  const allCollections = await Product.distinct(
    'properties.collection',
    baseGenderFilter,
  );

  // Fetch additional filter options
  const [categories, genders, colorProperties, sizeProperties] =
    await Promise.all([
      Category.find({
        name: { $ne: 'BLOG CATEGORY' },
        parent: { $ne: '670504cf2b1eeb8019f8e3fb' },
      }),
      Gender.find({}),
      Product.distinct('properties.color', productFilter),
      Product.distinct('properties.size', productFilter),
    ]);

  // Aggregate properties into a single object
  const properties = {
    color: colorProperties.filter(Boolean), // Remove falsy values
    size: sizeProperties.filter(Boolean),
    collection: allCollections.filter(Boolean), // Filtered collections
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
