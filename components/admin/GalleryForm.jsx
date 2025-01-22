import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import ImageDisplay from './ImageDisplay';
import { useRouter } from 'next/router';

export default function GalleryForm({
  _id,
  images: existingImages,
  title: existingTitle,
  gender: existingGender,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [gender, setGender] = useState(existingGender || '');
  const [genders, setGenders] = useState([]);
  const [goToGalleries, setGoToGalleries] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/genders').then((response) => {
      setGenders(response.data);
    });
  }, []);
  async function handleSave(e) {
    e.preventDefault();
    // Save gallery information to the database here
    const data = {
      title,
      gender,
      images,
    };

    if (_id) {
      await axios.put(`/api/galleries/`, { ...data, _id });
    } else {
      await axios.post('/api/galleries', data);
    }

    setGoToGalleries(true);
  }
  if (goToGalleries) {
    router.push('/galleries');
  }
  return (
    <form onSubmit={handleSave}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Gender:</label>
      <select value={gender} onChange={(ev) => setGender(ev.target.value)}>
        <option value="">None</option>
        {genders.length > 0 &&
          genders.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
      </select>
      <label>Media</label>
      <ImageDisplay images={images} setImages={setImages} />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
