import { useEffect, useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  ${(props) =>
    props.active
      ? `
    border: 2px solid #ccc;
  `
      : ` border: none;
      opacity: 0.85;`};
`;
const BigImage = styled.img`
  max-height: 610px;
  max-width: 450px;
  @media screen and (max-width:900px) {
    max-height: 610px;
    max-width: 84%;
  }
  @media screen and (max-width:780px) {
    max-height: 100%;
    max-width: 100%;
  }
`;
const Div = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width:780px) {
    flex-direction: column-reverse;
  }
`
const ImageButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  @media screen and (max-width:780px) {
    flex-direction: row;
  }
  margin-top: 10px;
`;
const ImageButton = styled.div`
 width: 47px;
  height: 60px;
  cursor: pointer;
 
`;
export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(null);
  useEffect(()=>{
    setActiveImage(images?.[0]) // Set first image as active when component mounts.
  },[images])
  
  return (
    <Div>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
           
            onClick={() => setActiveImage(image)}
          >
            <Image  active={image === activeImage} src={image} alt="Product Image" />
          </ImageButton>
        ))}
      </ImageButtons>
      
      <BigImage src={activeImage} />
    </Div>
  );
}
