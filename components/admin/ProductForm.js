import Layout from '@/pages/admin/layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';
import UploadButton from './UploadButton';
import ImageDisplay from './ImageDisplay';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  gender: assignedGender,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [category, setCategory] = useState(assignedCategory || '');
  const [gender, setGender] = useState(assignedGender || '');
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/server/categories').then((result) => {
      setCategories(result.data);
    });
    axios.get('/api/server/genders').then((response) => {
      setGenders(response.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      gender,
      properties: productProperties,
    };
    if (_id) {
      //update product
      await axios.put(`/api/server/products/`, { ...data, _id });
    } else {
      //create product
      await axios.post('/api/server/products', data);
    }

    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }

  function setProdProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      // Check if the property already has the value
      if (newProductProps[propName]?.includes(value)) {
        // If it does, remove the value from the array
        newProductProps[propName] = newProductProps[propName].filter(
          (v) => v !== value
        );
      } else {
        // If it doesn't, add the value to the array
        newProductProps[propName] = [
          ...(newProductProps[propName] || []),
          value,
        ];
      }
      return newProductProps;
    });
  }

  const propsToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propsToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propsToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  return (
    <Layout>
      <form onSubmit={saveProduct} >
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Gender</label>
        <select
          value={gender}
          onChange={(ev) => setGender(ev.target.value)}
          style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }}
        >
          <option
            style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }}
            value=""
            className="text-black"
          >
            None
          </option>
          {genders.length > 0 &&
            genders.map((g) => (
              <option
                style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }}
                value={g._id}
              >
                {g.name}
              </option>
            ))}
        </select>

        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }}
        >
          <option style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }} value="">
            Uncategorized
          </option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option
                value={c._id}
                style={{ color: '#0000009d',fontSize:'.9rem', backgroundColor: 'white',letterSpacing:'1px' }}
              >
                {c.name}{' '}
              </option>
            ))}
        </select>
        {categories.length > 0 &&
          propsToFill.map((p) => (
            <div className="flex gap-1" key={p.name}>
              <div>
                <h2 className="capitalize text-[#00000080] font-futura text-[.9rem]">{p.name}</h2>
                {p.values &&
                  p.values.map((v) => (
                    <label
                      key={v}
                      className={`checkbox-container ${
                        productProperties[p.name]?.includes(v) ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={v}
                        checked={
                          productProperties[p.name]?.includes(v) || false
                        }
                        onChange={(ev) => setProdProp(p.name, ev.target.value)}
                      />
                      {v}
                    </label>
                  ))}
              </div>
            </div>
          ))}

        <label>Photos </label>
        <ImageDisplay
          setImages={setImages}
          images={images}
          resizeAndEdit={true}
        />
        <label>Description</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="product description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
