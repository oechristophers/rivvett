import { mongooseConnect } from '@/lib/mongoose';
import { Gallery } from '@/models/Gallery';
import { Gender } from '@/models/Gender';
import React from 'react';
import styled from 'styled-components';
import RootLayout from '../layout';

const Wrapper = styled.div`
  padding: 30px;
  text-align: center;
  h2 {
    font-family: 'Futura Std Heavy';
    letter-spacing: 1.2px;
    margin: 0;
  }
  p {
    margin: 0;
    margin-bottom: 20px;
  }
`;
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    cursor: pointer;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
`;
export default function gallery({ gallery }) {
  console.log(gallery);
  return (
    <RootLayout>
      <Wrapper>
        <h2>ASOS LOOKS GOOD ON YOU</h2>
        <p>Tag @asos to get featured</p>
        <GalleryGrid>
          {gallery &&
            gallery.map((g) =>
              g.images.map((image, index) => (
                <img src={image} key={index} alt={gallery.title} />
              ))
            )}
        </GalleryGrid>
      </Wrapper>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const genderId = '669161b8bbede0f410af829e';
  const gallery = await Gallery.find({ gender: genderId }).populate('gender');
  return {
    props: {
      gallery: JSON.parse(JSON.stringify(gallery)),
    },
  };
}
