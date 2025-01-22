import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';

const Paragraph = styled.p`
  text-align: left;
  .quant {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .color {
    width: fit-content;
    display: flex;
    padding-right: 10px;
    text-transform: capitalize;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 0;

    .btn1,
    .btn2 {
      padding: 0;
      margin: 0;
      line-height: 1;
      height: 20px;
      cursor: pointer;
    }

    .btn1 {
      transform: translateY(-3px); /* Adjust to bring it closer to btn2 */
    }
    .btn2 {
      transform: translateY(-6px); /* Adjust to bring it closer to btn1 */
    }
  }

  ${(props) =>
    props.empty &&
    `
    text-align:center;
    width:100%;
    max-width:35ch;
    display:flex;
    margin:0 auto;
    padding-bottom:20px;
  `}
  ${(props) =>
    props.delivery &&
    css`
      font-size: 0.8rem;
      font-family: 'Futura Std Book';
      letter-spacing: 0.5px;
      padding-left: 3px;
      text-align: center;
    `}
    ${(props) =>
    props.total &&
    css`
      font-family: 'Futura Std Heavy';
      font-size: 0.8rem;
      letter-spacing: 1px;
      padding: 20px;
    `}
    ${(props) =>
    props.small &&
    css`
      font-family: 'Futura Std Book';
      font-size: 0.8rem;
      letter-spacing: 0.5px;
    `}
    ${(props) =>
    props.properties &&
    css`
      display: flex;
      align-items: center;
      font-family: 'Futura Std Book';
      font-weight: 100;
      margin: 0;
      font-size: 0.8rem;
      letter-spacing: 1.2px;
    `}
    ${(props) =>
    props.price &&
    css`
      font-size: 0.9rem;
      padding-bottom: 10px;
      font-family: 'Futura Std Bold';
      color: #0000008f;
    `}
    ${(props) =>
    props.title &&
    css`
      font-size: 0.8rem;
      letter-spacing: 1.2px;
      margin: 0;

      text-decoration: none;
      color: #000000d2;
      font-family: 'Futura Std Book';
      & > :hover {
        color: #2d77bc;
      }
      @media (max-width: 750px) {
        font-size: 0.85rem;
      }
    `}
`;

export default function P({ children, className, ...rest }) {
  return (
    <Paragraph className={`p ${className}`} {...rest}>
      {children}
    </Paragraph>
  );
}
