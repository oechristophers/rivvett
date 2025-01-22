import Header from '@/components/frontend/Header';
import ProductGrid from '@/components/frontend/ProductGrid';
import Wrapper from '@/components/frontend/Wrapper';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import styled from 'styled-components';
import RootLayout from './layout';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import { Gender } from '@/models/Gender';
import { Category } from '@/models/Category';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const Title = styled.h1`
  font-size: 1.5em;
`;

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
const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 1em;
  }

  select {
    padding: 5px;
    font-size: 1em;
  }
`;

export default function ProductsPage({
  products,
  categories,
  genders,
  properties,
}) {
  const router = useRouter();
  const { query } = router;

  const handleFilterChange = (value, name) => {
    console.log(`Changed: ${name} = ${value}`); // Debugging log to check value
    const updatedQuery = { ...query, [name]: value };

    if (value === '') {
      delete updatedQuery[name]; // Remove filter if empty
    }

    router.push({
      pathname: '/products',
      query: updatedQuery,
    });
  };

  const clearFilters = () => {
    // Reset the query to default (empty filters)
    router.push({
      pathname: '/products',
      query: {}, // Clear all query params
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
        &ldquo;All Products&ldquo;
      </h2>
      <FiltersContainer className="hidden md:flex px-10 justify-between py-5 bg-[#c6c4c4]">
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

        {/* By Gender */}
        <Select
          name="Gender"
          onValueChange={(value) => {
            console.log('Gender selected:', value); // Debugging log
            handleFilterChange(value, 'gender');
          }}
          value={query.gender || ''}
        >
          <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0  w-[18%] border-y-2 ">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>Gender</SelectItem>
            {genders.map((gender) => (
              <SelectItem key={gender._id} value={gender._id}>
                {gender.name}
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

          {/* By Gender */}
          <Select
            name="Gender"
            onValueChange={(value) => {
              console.log('Gender selected:', value); // Debugging log
              handleFilterChange(value, 'gender');
            }}
            value={query.gender || ''}
          >
            <SelectTrigger className="w-full capitalize mb-4 border-none shadow-none focus:outline-none outline-none focus:ring-0 focus:border-transparent">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>Gender</SelectItem>
              {genders.map((gender) => (
                <SelectItem key={gender._id} value={gender._id}>
                  {gender.name}
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
        <ProductGrid products={products} />
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

  // Validate and find the selected category
  const selectedCategory = query.category
    ? await Category.findById(query.category)
    : null;

  if (query.category && !selectedCategory) {
    return {
      notFound: true,
    };
  }

  // Find all child categories
  const childCategories = selectedCategory
    ? await Category.find({ parent: selectedCategory._id })
    : [];

  // Aggregate category IDs (selected + children)
  const categoryIds = selectedCategory
    ? [selectedCategory._id, ...childCategories.map((cat) => cat._id)]
    : [];

  // Base product filter
  const productFilter = categoryIds.length
    ? { category: { $in: categoryIds } }
    : {}; // No category filter if none selected

  // Add additional filters
  if (query.gender) productFilter.gender = query.gender;
  if (query.color) productFilter['properties.color'] = query.color;
  if (query.size) productFilter['properties.size'] = query.size;

  // Sorting logic
  const sort =
    query.sort === 'price-asc'
      ? { price: 1 }
      : query.sort === 'price-desc'
        ? { price: -1 }
        : { _id: -1 }; // Default: Most recent

  // Fetch products
  const products = await Product.find(productFilter, null, { sort }).populate([
    'category',
    'gender',
  ]);

  // Fetch additional data for filters
  const [categories, genders, colorProperties, sizeProperties] =
    await Promise.all([
      Category.find(
        {
          name: { $ne: 'BLOG CATEGORY' },
          parent: { $ne: '670504cf2b1eeb8019f8e3fb' },
        },
        '_id name parent', // Projection for only necessary fields
      ),
      Gender.find({}, '_id name'), // Only fetch `_id` and `name`
      Product.distinct('properties.color', productFilter), // Filter-specific distinct
      Product.distinct('properties.size', productFilter),
    ]);

  // Aggregate properties for filters
  const properties = {
    color: colorProperties.filter(Boolean), // Remove empty values
    size: sizeProperties.filter(Boolean),
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
