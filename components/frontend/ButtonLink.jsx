import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';

const StyledLink = styled(Link)`
  border: 0;
  padding: 10px 20px;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: white;
  svg {
    height: 10px;
    margin-right: 5px;
  }
  img {
    height: 15px;
  }
  @media screen and (max-width: 768px) {
    img {
      height: 25px;
    }
  }
  @media screen and (max-width: 600px) {
    img {
      height: 20px;
    }
  }
  ${(props) =>
    props.primary &&
    `
      background-color: white;
    `}
  ${(props) =>
    props.country &&
    `
      padding: 0;
    `}
  ${(props) =>
    props.foot &&
    `
      color: #494747dd;
      padding-left: 0;
      margin-top: 0;
      padding-bottom: 5px;
      width: fit-content;
      font-size: 0.8rem;
      &:hover {
        color: #2d77bc;
      }
    `}
  ${(props) =>
    props.shop &&
    `
      width: 100%;
      max-width: 200px;
      justify-content: center;
      padding: 7px 0;
      margin: 20px 0;
      color: black;
      border: 2px solid black;
      font-family: 'Futura Std heavy';
      letter-spacing: 1.9px;
      background: linear-gradient(to bottom left, white 50%, black 50%);
      background-size: 200% 200%;
      background-position: top right;
      transition: background-position 0.3s ease;

      &:hover {
        background-position: bottom left;
        color: white;
        border: 2px solid white;
      }

      text-transform: uppercase;
    `}
  ${(props) =>
    props.hero &&
    `
      margin: 0;
      color: black;
      background-color: white;
      width: fit-content;
      text-transform: uppercase;
      font-family: 'Futura Std bold';
      font-weight: bolder;
      font-size: 0.85rem;
      letter-spacing: 2.8px;
      padding: 13px 20px;
      background: linear-gradient(to bottom left, white 50%, black 50%);
      background-size: 200% 200%;
      background-position: top right;
      transition: background-position 0.3s ease;
      &:hover {
        background-position: bottom left;
        color: white;
      }
    `}
    
  ${(props) =>
    props.hero &&
    props.hero1 &&
    `
      display: flex;
      margin-left: auto;
      background-color: white;
      width: fit-content;
      @media screen and (max-width: 500px) {
        margin-left: 0;
      }
    `};
  ${(props) =>
    props.white &&
    !props.outline &&
    `
      background-color: white;
    `};

  ${(props) =>
    props.white &&
    props.outline &&
    `
      font-size: 0.9rem;
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}
