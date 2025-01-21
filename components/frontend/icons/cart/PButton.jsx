import React from 'react'
import styled from 'styled-components';
import css from 'styled-jsx/css';
import Button from '../../Button';

const StyledButton = styled(Button)`
  background: #000;
  display: block;
  width: 100%;
  ${(props) =>
    props.empty &&
    css`
      background-color: #018849;
      display: flex;
      width: fit-content;
      margin: 0 auto;
      text-transform: uppercase;
      color: white;
      font-weight: bolder;
      letter-spacing: 1px;
    `}
  ${(props) =>
    props.shopmore &&
    css`
      color: black;
      background-color: transparent;
      text-decoration: underline;
      margin-top: 5px;
    `}
`;
export default function PButton({ children, className, ...rest }) {
    return (
      <StyledButton className={`pbutton ${className}`} {...rest}>
        {children}
      </StyledButton>
    );
  }
