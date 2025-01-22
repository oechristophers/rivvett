import ImageDisplay from '@/components/admin/ImageDisplay';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { withSwal } from 'react-sweetalert2';
import Layout from './layout';

function Categories({
  swal,
  images: existingImages,
  posterImages: existingPosterImages,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState(existingImages || []);
  const [posterImages, setPosterImages] = useState(existingPosterImages || []);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get('/api/server/categories').then((result) => {
      setCategories(result.data);
    });
  }

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  async function saveCategory(ev) {
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({ name: p.name, values: p.values })),
      images,
      posterImages,
    };
    ev.preventDefault();
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put(`api/categories`, data);

      setEditedCategory(null);
    } else {
      await axios.post('/api/server/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
    setImages([]);
    setPosterImages([]);
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(category.properties);
    setImages(category.images);
    setPosterImages(category.posterImages);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, delete !',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        // when confirmed show promise
        console.log({ result });
        if (result.isConfirmed) {
          const _id = category._id;
          await axios.delete('/api/server/categories?_id=' + _id);
          fetchCategories();
        }
      })
      .catch((error) => {
        //when promise rejected
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function updatePropName(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
    console.log({ index, property, newName });
  }
  function updatePropValue(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProp(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <>
        <h1>Categories</h1>
        <label className="text-white ">
          {editedCategory ? `Edit category ${editedCategory.name}` : ''}
        </label>
        <form onSubmit={saveCategory} className="">
          <div className="flex gap-1">
            <input
              type="text"
              placeholder={'Category name'}
              className=""
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <select
              className=""
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
            >
              <option value=""></option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
          </div>
          <label>Images</label>
          <div>
            <ImageDisplay setImages={setImages} images={images} />
          </div>
          <label>Poster Images</label>
          <div>
            <ImageDisplay
              setImages={setPosterImages}
              images={posterImages}
              resizeAndEdit={true}
            />
          </div>
          <div className="mb-2">
            {editedCategory && (
              <label className="block text-white">Properties</label>
            )}

            <button
              type="button"
              className="btn-default text-sm h-10 mt-2 mb-2"
              onClick={addProperty}
            >
              Add new Property
            </button>
          </div>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  placeholder="property name (example:color)"
                  value={property.name}
                  onChange={(ev) =>
                    updatePropName(index, property, ev.target.value)
                  }
                  className="mb-0"
                />
                <input
                  type="text"
                  placeholder="values, comma seperated"
                  value={property.values}
                  onChange={(ev) =>
                    updatePropValue(index, property, ev.target.value.split(','))
                  }
                  className="mb-0"
                />
                <button
                  type="button"
                  className="btn-default"
                  onClick={() => removeProp(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                className="btn-default"
                onClick={() => {
                  setEditedCategory(null);
                  setName('');
                  setParentCategory('');
                  setProperties([]);
                }}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary h-10">
              Save
            </button>
          </div>
        </form>
        {!editedCategory && (
          <table className="basic mt-4 ">
            <thead>
              <tr>
                <td>Category name</td>
                <td>Parent category</td>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 &&
                paginatedCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td className="flex justify-between">
                      {category?.parent?.name || 'none'}
                      <div>
                        <button
                          onClick={() => editCategory(category)}
                          className="btn-default text-sm p-1 rounded-md px-2 inline-flex gap-1 mr-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4 pt-[0.10rem]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteCategory(category);
                          }}
                          className="btn-red text-sm p-1 rounded-md px-2 inline-flex gap-1 mr-1 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4 pt-[0.10rem]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}{' '}
        <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
