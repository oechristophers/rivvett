import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';

const StyledDiv = styled.div`
  margin-left: 10px;
  .arrow {
    margin: 0;
    margin-top: 2px;
    margin-right: 20px;
  }
  ${(props) =>
    props.total &&
    css`
      display: flex;
      justify-content: space-between;
    `}
  ${(props) =>
    props.close &&
    css`
      position: absolute;
      top: 0;
      right: 0;
      margin-right: -20px;
    `}
  ${(props) =>
    props.container &&
    css`
      position: relative;
      padding-top: 20px;
    `}
  ${(props) =>
    props.size &&
    css`
      width: fit-content;
      margin-left: 0;
      position: relative;
      display: inline-block;
    `}
`;

export default function Div({ children, className, ...rest }) {
  return (
    <StyledDiv className={`div ${className}`} {...rest}>
      {children}
    </StyledDiv>
  );
}
