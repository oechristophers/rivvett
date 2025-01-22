import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ImageDisplay from './ImageDisplay';
import CustomSelect from './CustomSelect';
import Caption from './Caption';

export default function BlogForm({
  _id,
  title: existingTitle,
  subtitles: existingSubtitles,
  body: existingBody,
  author: existingAuthor,
  gender: assignedGender,
  mainImages: existingMainImages,
  featuredProducts: existingFeaturedProducts,
  mediaCaptions: existingMediaCaptions,
  category: existingCategory,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [subtitles, setSubtitles] = useState(existingSubtitles || []);
  const [body, setBody] = useState(existingBody || '');
  const [author, setAuthor] = useState(existingAuthor || '');
  const [category, setCategory] = useState(existingCategory || '');
  const [mainImages, setMainImages] = useState(existingMainImages || []);
  const [gender, setGender] = useState(assignedGender || '');
  const [featuredProducts, setFeaturedProducts] = useState(
    existingFeaturedProducts || [],
  );
  const [mediaCaptions, setMediaCaptions] = useState(
    existingMediaCaptions || [],
  );
  const [goToBlogs, setGoToBlogs] = useState(false);
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const [addingSubtitle, setAddingSubtitle] = useState(false);
  const [subtitleImages, setSubtitleImages] = useState([]);
  const [subMediaCaptions, setSubMediaCaptions] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/server/products').then((result) => {
      setProducts(result.data);
    });
    axios.get('/api/server/genders').then((response) => {
      setGenders(response.data);
    });
    axios.get('/api/server/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  async function saveBlog(ev) {
    ev.preventDefault();
    const data = {
      title,
      mainImages,
      body,
      subtitles,
      featuredProducts,
      author,
      gender,
      mediaCaptions,
    };
    if (category) {
      data.category = category;
    }
    if (_id) {
      await axios.put(`/api/server/blogs/`, { ...data, _id });
    } else {
      await axios.post('/api/server/blogs', data);
    }

    setGoToBlogs(true);
  }

  if (goToBlogs) {
    router.push('/blogs');
  }

  const handleAddSubtitle = () => {
    const newSubtitle = {
      subtitle,
      subtitleImages,
      subMediaCaptions,
      content,
      category,
    };
    setSubtitles([...subtitles, newSubtitle]);
    setSubtitle('');
    setSubtitleImages([]);
    setSubMediaCaptions([]);
    setSubProducts([]);
    setContent('');
  };

  const updateSubtitle = (index, key, value) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index][key] = value;
    setSubtitles(newSubtitles);
    console.log('Updated Subtitles:', newSubtitles); // Log the updated subtitles
  };

  return (
    <form onSubmit={saveBlog}>
      <h2 className="text-[#938787d0]">Main Content</h2>
      <label>Blog Title</label>
      <input
        type="text"
        placeholder="blog title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Blog Author</label>
      <input
        type="text"
        placeholder="written by"
        value={author}
        onChange={(ev) => setAuthor(ev.target.value)}
        style={{
          color: '#0000009d',
          fontSize: '.9rem',
          backgroundColor: 'white',
          letterSpacing: '1px',
        }}
      />
      <label>Gender</label>
      <select
        value={gender}
        onChange={(ev) => setGender(ev.target.value)}
        style={{
          color: '#0000009d',
          fontSize: '.9rem',
          backgroundColor: 'white',
          letterSpacing: '1px',
        }}
      >
        <option
          style={{
            color: '#0000009d',
            fontSize: '.9rem',
            backgroundColor: 'white',
            letterSpacing: '1px',
          }}
          value=""
        >
          None
        </option>
        {genders.length > 0 &&
          genders.map((g) => (
            <option
              style={{
                color: '#0000009d',
                fontSize: '.9rem',
                backgroundColor: 'white',
                letterSpacing: '1px',
              }}
              key={g._id}
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
        style={{
          color: '#0000009d',
          fontSize: '.9rem',
          backgroundColor: 'white',
          letterSpacing: '1px',
        }}
      >
        <option
          style={{
            color: '#0000009d',
            fontSize: '.9rem',
            backgroundColor: 'white',
            letterSpacing: '1px',
          }}
          value=""
        >
          None
        </option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option
              style={{
                color: '#0000009d',
                fontSize: '.9rem',
                backgroundColor: 'white',
                letterSpacing: '1px',
              }}
              key={c._id}
              value={c._id}
            >
              {c.name}
            </option>
          ))}
      </select>

      <label>Body</label>
      <textarea
        cols={30}
        rows={30}
        placeholder="separate paragraphs with line breaks '<br/>'"
        value={body}
        onChange={(ev) => setBody(ev.target.value)}
      />

      <label>Media</label>
      <ImageDisplay setImages={setMainImages} images={mainImages} />
      <Caption captions={mediaCaptions} setCaptions={setMediaCaptions} />
      <label>Featured Products</label>
      <CustomSelect
        setFeaturedProducts={setFeaturedProducts}
        items={products}
        featuredProducts={featuredProducts}
      />
      <h3 className="text-[#938787d0] pt-3">Sub-content</h3>
      {subtitles.length < 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAddingSubtitle(true);
            }}
            className="btn-primary mb-3"
          >
            Add Subtitles
          </button>
          <br />
        </>
      )}
      {addingSubtitle && (
        <div>
          <label>Subtitle</label>
          <input
            type="text"
            placeholder="subtitle"
            value={subtitle}
            onChange={(ev) => setSubtitle(ev.target.value)}
          />
          <label>Subtitle Media</label>
          <ImageDisplay setImages={setSubtitleImages} images={subtitleImages} />
          <Caption
            captions={subMediaCaptions}
            setCaptions={setSubMediaCaptions}
          />
          <CustomSelect
            setFeaturedProducts={setSubProducts}
            items={products}
            featuredProducts={subProducts}
          />
          <label>Content</label>
          <textarea
            cols={30}
            rows={30}
            placeholder="separate paragraphs with line breaks '<br/>'"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
          />
          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleAddSubtitle();
              setAddingSubtitle(false);
            }}
          >
            Add Subtitle
          </button>
        </div>
      )}

      {subtitles.length > 0 &&
        subtitles.map((s, index) => {
          return (
            <div key={index}>
              <label>Subtitle</label>
              <input
                type="text"
                placeholder="subtitle"
                value={s.subtitle}
                onChange={(ev) =>
                  updateSubtitle(index, 'subtitle', ev.target.value)
                }
              />
              <label>Subtitle Media</label>
              <ImageDisplay
                setImages={(newImages) => {
                  updateSubtitle(index, 'subtitleImages', newImages || []);
                  console.log(
                    `Updated subtitleImages for index ${index}:`,
                    newImages,
                  ); // Log the updated images
                }}
                images={s.subtitleImages || []} // Ensuring subtitleImages is always an array
                index={index}
              />
              <section className="mb-4">
                <Caption
                  setCaptions={(newCaptions) => {
                    updateSubtitle(
                      index,
                      'subMediaCaptions',
                      newCaptions || [],
                    );
                  }}
                  captions={s.subMediaCaptions || []}
                />{' '}
              </section>
              <CustomSelect
                items={products}
                setFeaturedProducts={(prod) => {
                  updateSubtitle(index, 'subProducts', prod || []);
                }}
                featuredProducts={s.subProducts || []}
              />
              <label>Content</label>
              <textarea
                cols={30}
                rows={30}
                placeholder="content"
                value={s.content}
                onChange={(ev) =>
                  updateSubtitle(index, 'content', ev.target.value)
                }
              />
              <section className="flex justify-between">
                <button
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddSubtitle();
                    setAddingSubtitle(false);
                  }}
                >
                  Add New
                </button>
                <button
                  className="btn-primary"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSubtitles(subtitles.filter((_, i) => i !== index));
                  }}
                >
                  Delete Subtitle
                </button>
              </section>
            </div>
          );
        })}
      <button type="submit" className="btn-primary mt-4">
        Save
      </button>
    </form>
  );
}
