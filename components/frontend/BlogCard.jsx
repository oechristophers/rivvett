import styled from 'styled-components';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/router';

const BlogWrapper = styled.div`
  padding: 0 10px;
  @media (max-width: 450px) {
    padding: 0;
  }
  @media (min-width: 768px) {
    transition: transform 0.3s ease;
    &:hover {
      transform: ${({ inId }) => (inId ? 'scale(1.04)' : 'none')};
    }
  }
`;
const Box = styled(Link)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: auto;
  background-color: #78747488;
  object-fit: contain; /* Ensures images maintain aspect ratio and crop if needed */
  object-position: top;
  position: sticky;

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%; /* Adjust this to your desired max height */
  }

  section {
    width: 100%;
    height: auto;
    max-height: 100%;
    min-height: 100%;
    margin-top: 50%;
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  padding-top: 10px;
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: #000000d2;
  font-family: 'Futura Std Bold';
  @media (max-width: 750px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std heavy';
    font-weight: 900;
  }
`;

const Dates = styled.h3`
  width: 100%;
  font-size: 0.75rem;
  font-family: 'Futura Std Heavy';
  position: absolute;
  letter-spacing: 0.5px;
  padding-bottom: 10px;
  left: 0;
  margin: 0;
  margin-left: -10px;
  text-align: right;
  bottom: 0;
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
    letter-spacing: 1.8px;
    font-family: 'Futura Std heavy';
  }
`;
const BlogInfo = styled.div`
  display: flex;
  position: relative;
  padding: 0 10px;
  color: black;
  flex-direction: column;
  line-height: 1.2;
  height: 130px;
  background-color: white;
  p {
    padding-top: 10px;
    font-size: 0.85rem;
  }
  @media (max-width: 768px) {
    height: 160px;
    p {
      font-size: 0.8rem;
      font-family: 'Futura Std book';
    }
  }
  @media screen and (max-width: 500px) {
    p {
      letter-spacing: 1px;
    }
    height: 130px;
  }
`;

export default function BlogCard({
  _id,
  title,
  mediaCaptions,
  mainImages,
  createdAt,
  inId,
}) {
  const rout = useRouter();
  const path = rout.pathname.split('/')[1];
  const [loading, setLoading] = useState(true);
  const url = `/${path}/blogs/` + _id;

  const handleImageLoad = () => {
    setLoading(false); // Once the image is fully loaded, set loading to false
  };
  return (
    <BlogWrapper inId>
      <Box href={url}>
        {loading && (
          <section>
            <ClipLoader
              color="#000" // Adjust color as needed
              loading={loading}
              size={50} // Adjust size as needed
            />
          </section>
        )}
        <img
          src={mainImages}
          onLoad={handleImageLoad}
          style={{ display: loading ? 'none' : 'block' }}
          alt={title}
        />
      </Box>
      <BlogInfo>
        <Title>{title}</Title>
        <p>{mediaCaptions}</p>
        <Dates>
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Dates>
      </BlogInfo>
    </BlogWrapper>
  );
}
