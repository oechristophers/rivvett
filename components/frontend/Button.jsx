import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';

export const ButtonStyle = css``;

const StyledButton = styled.button`
  border: 0;
  padding: 10px 20px;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  svg {
    height: 10px;
    margin-right: 5px;
  }
  ${(props) =>
    props.primary &&
    `
      font-size: 0.9rem;
      background-color: white;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    `
      background-color: white;
    `}
    ${(props) =>
    props.white &&
    props.outline &&
    `
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
`;
export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
