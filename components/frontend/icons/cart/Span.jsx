import React from 'react'
import styled from 'styled-components';
import css from 'styled-jsx/css';

const StyledP = styled.span`
  color: black;
  margin: 0;
  ${(props) =>
    props.delivery &&
    css`
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-weight: 100;
      font-family: 'Futura Std Bold';
      font-size: 0.8rem;
    `}
  Img {
    width: 1.5rem;
    height: 1.5rem;
    z-index: 100;
    margin-left: 20px;
  }
`;
export default function Span({ children, className, ...rest }) {
    return (
      <StyledP className={`span ${className}`} {...rest}>
        {children}
      </StyledP>
    );
  }
