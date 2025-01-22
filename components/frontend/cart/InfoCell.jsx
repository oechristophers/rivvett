import React from 'react';
import styled from 'styled-components';

const Div = styled.td`
  display: grid;
  position: relative;
  grid-template-columns: 0.2fr 1.8fr;
  img {
    min-width: 100%;
    max-height: 8rem;
  }
  .shipping {
    width: 40ch;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
    @media screen and (max-width: 600px) {
      font-size: 0.6rem;
      width: 32ch;
    }
  }
  .expandMore {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      margin-top: 6px;
      margin-left: 4px;
    }
  }
  .shipDiv {
    display: flex;
    flex-direction: column;
    gap: 0;
    transition: all 0.3s ease;
  }
  .title {
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .shipBtn {
    margin-top: 20px;
    padding: 5px 50px;
    text-transform: uppercase;
    font-family: 'Futura Std Heavy';
    letter-spacing: 1.5px;
    background-color: transparent;
    border: 2px solid green;
    width: fit-content;
    cursor: pointer;
  }
`;
export default function InfoCell({ children, className, ...rest }) {
  return (
    <Div className={`span ${className}`} {...rest}>
      {children}
    </Div>
  );
}
