import { info } from '@/constants/infoDisplay';
import React from 'react';
import styled from 'styled-components';

const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px 25px;
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 10px 0;
  }
`;
const Box = styled.section`
  border: 1px solid #ccc;
  height: 25vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background: ${({ color }) => color};
  padding: 10px 5px;
  @media screen and (max-width: 1025px) {
    height: 16vw;
    padding: 0;
  }
  @media screen and (max-width: 912px) {
    height: 15vw;
    padding: 0;
  }
  @media screen and (max-width: 767px) {
    height: 29vh;
  }
  @media screen and (max-width: 540px) {
    height: 28vw;
    padding: 20px 0;
  }
`;
const Title = styled.h2`
  color: black;
  text-align: center;
  margin: 0;
  max-width: 18ch;
  font-size: 1.3rem;
  @media screen and (max-width: 990px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 540px) {
    font-size: 0.9rem;
  }
`;

export default function InfoBox() {
  return (
    <InfoBoxes>
      {info.map((item, index) => (
        <Box key={index} color={item.color}>
          <Title>{item.p1}</Title>
          {item.p2 && <Title>{item.p2}</Title>}
        </Box>
      ))}
    </InfoBoxes>
  );
}
